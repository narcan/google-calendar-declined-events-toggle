// Initialize state
let showDeclined = false;
let observerActive = false;
let buttonCheckInterval = null;

// Load saved state
chrome.storage.sync.get(['showDeclined'], (result) => {
  showDeclined = result.showDeclined || false;
  applyVisibility();
});

// Create and inject toggle button
function createToggleButton() {
  // Check if button already exists
  if (document.getElementById('declined-toggle')) return;

  // Find the parent container that holds the date navigation section
  // Try multiple selectors for robustness
  const dateNavigationWrapper = document.querySelector('div[jscontroller="qoxFud"]') ||
                                  document.querySelector('[jsaction*="qiUtGf"]') ||
                                  document.querySelector('.mrYXIc');
  
  if (!dateNavigationWrapper) {
    // Retry if header not loaded yet
    return;
  }

  // Create container
  const container = document.createElement('div');
  container.id = 'declined-toggle';
  container.className = 'declined-toggle-container';

  // Create toggle switch
  const label = document.createElement('label');
  label.className = 'declined-toggle-label';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'declined-checkbox';
  checkbox.checked = showDeclined;

  const slider = document.createElement('span');
  slider.className = 'declined-toggle-slider';

  const text = document.createElement('span');
  text.className = 'declined-toggle-text';
  text.textContent = 'Declined Events';

  label.appendChild(text);
  label.appendChild(checkbox);
  label.appendChild(slider);
  container.appendChild(label);

  // Insert the toggle immediately after the date navigation wrapper
  dateNavigationWrapper.parentElement.insertBefore(container, dateNavigationWrapper.nextSibling);

  // Add event listener
  checkbox.addEventListener('change', (e) => {
    showDeclined = e.target.checked;
    chrome.storage.sync.set({ showDeclined });
    applyVisibility();
  });
}

// More robust declined event detection
function isDeclinedEvent(element) {
  // Check for declined indicator in aria-label
  const labelDiv = element.querySelector('.XuJrye');
  if (labelDiv && labelDiv.textContent) {
    if (labelDiv.textContent.includes('Declined') || 
        labelDiv.textContent.includes('declined')) {
      return true;
    }
  }
  
  // Check aria-label on the element itself
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel && (ariaLabel.includes('Declined') || ariaLabel.includes('declined'))) {
    return true;
  }
  
  // Check for common declined event styling patterns
  // Declined events often have specific opacity or styling
  const style = window.getComputedStyle(element);
  if (style.opacity === '0.4' || style.opacity === '0.5') {
    // Additional check: does it have event-like attributes?
    if (element.hasAttribute('data-eventid') || element.hasAttribute('data-eventchip')) {
      return true;
    }
  }
  
  return false;
}

// Apply visibility based on current state with throttling
let applyVisibilityTimeout = null;
function applyVisibility() {
  // Throttle to avoid excessive processing
  if (applyVisibilityTimeout) {
    clearTimeout(applyVisibilityTimeout);
  }
  
  applyVisibilityTimeout = setTimeout(() => {
    if (!showDeclined) {
      // Hide declined events
      // Target multiple possible event container types for different views
      const eventSelectors = [
        'div[data-eventchip]',           // Week/Day view events
        'div[data-eventid]',             // Alternative event containers
        'div[role="button"][data-draggable-id]', // Draggable events
        '.event',                        // Generic event class (if exists)
        '[jsname][data-eventid]'        // JS-controller managed events
      ];
      
      eventSelectors.forEach(selector => {
        const events = document.querySelectorAll(selector);
        events.forEach(event => {
          if (isDeclinedEvent(event)) {
            event.classList.add('declined-event-hidden');
          }
        });
      });
      
      document.body.classList.add('hide-declined-events');
    } else {
      // Show declined events
      document.querySelectorAll('.declined-event-hidden').forEach(event => {
        event.classList.remove('declined-event-hidden');
      });
      
      document.body.classList.remove('hide-declined-events');
    }
  }, 100); // 100ms throttle
}

// Optimized observer with debouncing
let observerTimeout = null;
const observer = new MutationObserver((mutations) => {
  // Only process if we're hiding declined events
  if (!showDeclined) {
    // Debounce to avoid excessive processing
    if (observerTimeout) {
      clearTimeout(observerTimeout);
    }
    
    observerTimeout = setTimeout(() => {
      // Only check if mutations include added nodes that might be events
      let shouldProcess = false;
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any added nodes are or contain events
          for (const node of mutation.addedNodes) {
            if (node.nodeType === 1) { // Element node
              if (node.hasAttribute?.('data-eventchip') || 
                  node.hasAttribute?.('data-eventid') ||
                  node.querySelector?.('[data-eventchip], [data-eventid]')) {
                shouldProcess = true;
                break;
              }
            }
          }
        }
        if (shouldProcess) break;
      }
      
      if (shouldProcess) {
        applyVisibility();
      }
    }, 150); // 150ms debounce
  }
});

// Initialize observer with optimized configuration
function startObserver() {
  if (observerActive) return;
  
  // Observe only the main calendar content area, not the entire body
  const calendarContent = document.querySelector('[role="main"]') || 
                         document.querySelector('.U0exHf') ||
                         document.body;
  
  observer.observe(calendarContent, {
    childList: true,
    subtree: true,
    attributes: false, // Don't watch attribute changes
    characterData: false // Don't watch text changes
  });
  
  observerActive = true;
}

// Stop observer when not needed
function stopObserver() {
  if (observerActive) {
    observer.disconnect();
    observerActive = false;
  }
}

// Handle visibility changes (tab switching, minimize/restore)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Stop observer when tab is hidden to save resources
    stopObserver();
  } else {
    // Resume observer when tab becomes visible
    if (!showDeclined) {
      applyVisibility();
      startObserver();
    }
  }
});

// Initialize when DOM is ready
function init() {
  createToggleButton();
  applyVisibility();
  
  // Only start observer if we're hiding declined events
  if (!showDeclined) {
    startObserver();
  }
  
  // Watch for toggle state changes to manage observer
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.showDeclined) {
      if (changes.showDeclined.newValue) {
        stopObserver();
      } else {
        startObserver();
      }
    }
  });
}

// Wait for page to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Check for button periodically (for SPA navigation)
// But use a much longer interval to reduce overhead
buttonCheckInterval = setInterval(() => {
  if (!document.getElementById('declined-toggle')) {
    createToggleButton();
  }
}, 5000); // Check every 5 seconds instead of 2

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  stopObserver();
  if (buttonCheckInterval) {
    clearInterval(buttonCheckInterval);
  }
});