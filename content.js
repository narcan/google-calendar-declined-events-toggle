// Initialize state
let showDeclined = false;
let isTogglingNative = false;
let hasSyncedOnLoad = false; // Track if we've already synced on initial load

// Helper function to safely use chrome.storage
function safeChromeStorage(operation, ...args) {
  try {
    if (!chrome || !chrome.storage || !chrome.runtime || !chrome.runtime.id) {
      return;
    }
    operation(...args);
  } catch (error) {
    console.error('[Declined Events] Chrome storage error:', error);
  }
}

// Load saved state from Chrome storage
safeChromeStorage(() => {
  chrome.storage.sync.get(['showDeclined'], (result) => {
    if (chrome.runtime.lastError) {
      return;
    }
    showDeclined = result.showDeclined !== undefined ? result.showDeclined : false;
    updateToggleUI();
  });
});

// Listen for storage changes (syncs across tabs)
safeChromeStorage(() => {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    try {
      if (namespace === 'sync' && changes.showDeclined) {
        showDeclined = changes.showDeclined.newValue;
        updateToggleUI();
      }
    } catch (error) {
      console.error('[Declined Events] Storage listener error:', error);
    }
  });
});

// Create and inject toggle button
function createToggleButton() {
  // Check if button already exists
  if (document.getElementById('declined-toggle')) return;

  // Find the parent container that holds the date navigation section
  const dateNavigationWrapper = document.querySelector('div[jscontroller="qoxFud"]') ||
                                  document.querySelector('[jsaction*="qiUtGf"]') ||
                                  document.querySelector('.mrYXIc');
  
  if (!dateNavigationWrapper) {
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
  checkbox.addEventListener('change', async (e) => {
    try {
      const newState = e.target.checked;
      
      // Prevent recursive toggling
      if (isTogglingNative) {
        return;
      }
      
      // Show loading state
      label.classList.add('loading');
      checkbox.disabled = true;
      
      // Try to click the native checkbox
      const success = await toggleNativeCheckbox(newState);
      
      // Remove loading state
      label.classList.remove('loading');
      checkbox.disabled = false;
      
      if (success) {
        showDeclined = newState;
        safeChromeStorage(() => {
          chrome.storage.sync.set({ showDeclined });
        });
      } else {
        // Revert UI if native toggle failed
        checkbox.checked = showDeclined;
        alert('Could not toggle the Calendar setting. Please try refreshing the page or toggle it manually from the "Filter and view" menu.');
      }
    } catch (error) {
      console.error('[Declined Events] Toggle error:', error);
      // Remove loading state
      label.classList.remove('loading');
      checkbox.disabled = false;
      checkbox.checked = showDeclined;
    }
  });
}

// Find and click the native "Show declined events" checkbox
async function toggleNativeCheckbox(targetState) {
  isTogglingNative = true;
  
  try {
    // Find the "Filter and view" button (the funnel icon)
    const filterButton = document.querySelector('[aria-label="Filter and view"]') ||
                         document.querySelector('[jsname="JZwYh"]');
    
    if (!filterButton) {
      console.error('[Declined Events] Could not find "Filter and view" button');
      return false;
    }
    
    // Click to open the menu
    filterButton.click();
    
    // Wait for menu to open
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find the "Show declined events" checkbox in the menu
    const nativeCheckbox = await findNativeCheckboxInMenu();
    
    if (!nativeCheckbox) {
      console.error('[Declined Events] Could not find "Show declined events" checkbox in menu');
      // Try to close by clicking away
      document.body.click();
      return false;
    }
    
    // Check current state
    const isCurrentlyChecked = nativeCheckbox.getAttribute('aria-checked') === 'true';
    
    // Only click if we need to change the state
    if (isCurrentlyChecked !== targetState) {
      nativeCheckbox.click();
      
      // Wait for the setting to be saved
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Close the menu using Escape key
      closeMenuWithEscape();
      await new Promise(resolve => setTimeout(resolve, 400));
    } else {
      // Close menu without making changes
      await new Promise(resolve => setTimeout(resolve, 200));
      closeMenuWithEscape();
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    // Final cleanup: remove any lingering backdrops
    cleanupBackdrops();
    
    return true;
    
  } catch (error) {
    console.error('[Declined Events] Error toggling native checkbox:', error);
    return false;
  } finally {
    isTogglingNative = false;
  }
}

// Verify that the native setting matches expected state
async function verifyNativeSetting(expectedState) {
  try {
    console.log('[Declined Events] Verifying setting is:', expectedState);
    
    const filterButton = document.querySelector('[aria-label="Filter and view"]') ||
                         document.querySelector('[jsname="JZwYh"]');
    
    if (!filterButton) return false;
    
    // Open menu
    filterButton.click();
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Find checkbox
    const nativeCheckbox = await findNativeCheckboxInMenu();
    
    let isCorrect = false;
    
    if (nativeCheckbox) {
      const actualState = nativeCheckbox.getAttribute('aria-checked') === 'true';
      isCorrect = (actualState === expectedState);
      console.log('[Declined Events] Verification: expected', expectedState, 'actual', actualState, 'match:', isCorrect);
    }
    
    // Close menu
    const calendarView = document.querySelector('[role="main"]');
    if (calendarView) {
      calendarView.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }
    
    return isCorrect;
    
  } catch (error) {
    console.error('[Declined Events] Verification error:', error);
    return false;
  }
}

// Find the native "Show declined events" checkbox in the opened menu
function findNativeCheckboxInMenu() {
  return new Promise((resolve) => {
    const attempts = 30; // Try for 3 seconds
    let currentAttempt = 0;
    
    const findCheckbox = setInterval(() => {
      currentAttempt++;
      
      // Look for menu items with role="menuitemcheckbox"
      const menuItems = document.querySelectorAll('[role="menuitemcheckbox"]');
      
      for (const item of menuItems) {
        // Check the text content
        const textElement = item.querySelector('[jsname="K4r5Ff"]') || item;
        const text = textElement.textContent || '';
        
        if (text.includes('Show declined events') || 
            text.includes('declined events') ||
            text.toLowerCase().includes('declined')) {
          clearInterval(findCheckbox);
          resolve(item);
          return;
        }
      }
      
      // Backup: Try finding by jsname attribute (from network capture)
      const byJsName = document.querySelector('[jsname="nXdsbe"]');
      if (byJsName && byJsName.getAttribute('role') === 'menuitemcheckbox') {
        clearInterval(findCheckbox);
        resolve(byJsName);
        return;
      }
      
      if (currentAttempt >= attempts) {
        clearInterval(findCheckbox);
        resolve(null);
      }
    }, 100);
  });
}

// Close menu by simulating Escape key press
function closeMenuWithEscape() {
  const escapeEvent = new KeyboardEvent('keydown', {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    which: 27,
    bubbles: true,
    cancelable: true
  });
  document.dispatchEvent(escapeEvent);
  
  // Also try on the menu element itself
  const menu = document.querySelector('[role="menu"]');
  if (menu) {
    menu.dispatchEvent(escapeEvent);
  }
}

// Remove any lingering backdrop elements
function cleanupBackdrops() {
  // Find and remove backdrop elements
  const backdrops = document.querySelectorAll('[role="presentation"]');
  backdrops.forEach(backdrop => {
    if (backdrop.style.backgroundColor === 'rgba(0, 0, 0, 0.4)' ||
        backdrop.style.backgroundColor === 'rgba(0,0,0,0.4)' ||
        backdrop.classList.contains('gb_g')) {
      backdrop.remove();
    }
  });
  
  // Also check for any elements with specific backdrop styling
  const allDivs = document.querySelectorAll('div');
  allDivs.forEach(div => {
    const style = window.getComputedStyle(div);
    if (style.position === 'fixed' && 
        style.backgroundColor.includes('rgba(0, 0, 0') &&
        (style.top === '0px' || style.inset === '0px')) {
      div.remove();
    }
  });
}

// Update toggle UI to match current state
function updateToggleUI() {
  const checkbox = document.getElementById('declined-checkbox');
  if (checkbox && !checkbox.disabled) {
    checkbox.checked = showDeclined;
  }
}

// Initialize when DOM is ready
function init() {
  createToggleButton();
  
  // Wait for calendar to fully load, then do one-time sync
  setTimeout(() => {
    syncWithNativeSetting();
  }, 3000); // Wait 3 seconds for calendar to stabilize
}

// Sync our toggle state with Google Calendar's native setting
async function syncWithNativeSetting() {
  if (isTogglingNative) {
    return;
  }
  
  try {
    isTogglingNative = true;
    
    // Find the "Filter and view" button
    const filterButton = document.querySelector('[aria-label="Filter and view"]') ||
                         document.querySelector('[jsname="JZwYh"]');
    
    if (!filterButton) {
      return;
    }
    
    // Click to open menu
    filterButton.click();
    
    // Wait for menu
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Find checkbox
    const nativeCheckbox = await findNativeCheckboxInMenu();
    
    if (nativeCheckbox) {
      const isChecked = nativeCheckbox.getAttribute('aria-checked') === 'true';
      
      // Update our state to match Google's setting
      if (isChecked !== showDeclined) {
        showDeclined = isChecked;
        safeChromeStorage(() => {
          chrome.storage.sync.set({ showDeclined });
        });
        updateToggleUI();
      }
    }
    
    // Close menu with Escape key
    await new Promise(resolve => setTimeout(resolve, 200));
    closeMenuWithEscape();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Clean up any backdrops
    cleanupBackdrops();
    
  } catch (error) {
    console.error('[Declined Events] Error syncing with native setting:', error);
  } finally {
    isTogglingNative = false;
  }
}

// Wait for page to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Detect when user goes to settings and returns
function setupSettingsDetection() {
  let wasInSettings = window.location.href.includes('/settings');
  let lastUrl = window.location.href;
  
  // Check for URL changes periodically
  setInterval(() => {
    const currentUrl = window.location.href;
    
    if (currentUrl !== lastUrl) {
      const nowInSettings = currentUrl.includes('/settings');
      
      // If we were in settings and now we're not, sync
      if (wasInSettings && !nowInSettings) {
        setTimeout(() => {
          if (!isTogglingNative) {
            syncWithNativeSetting();
          }
        }, 1000);
      }
      
      wasInSettings = nowInSettings;
      lastUrl = currentUrl;
    }
  }, 500); // Check every 500ms
}

// Start monitoring for settings navigation
setTimeout(setupSettingsDetection, 3000);

// Re-sync when page becomes visible (e.g., after switching tabs or changing settings)
// DISABLED: Auto-sync causes menu to open, which dims the screen
// Users should click the toggle if they changed the setting manually
/*
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && hasSyncedOnLoad) {
    console.log('[Declined Events] Page became visible, re-syncing...');
    setTimeout(() => {
      syncWithNativeSetting();
    }, 500);
  }
});

window.addEventListener('focus', () => {
  if (hasSyncedOnLoad) {
    console.log('[Declined Events] Window gained focus, re-syncing...');
    setTimeout(() => {
      syncWithNativeSetting();
    }, 500);
  }
});
*/

// Re-check for button periodically (for SPA navigation)
setInterval(() => {
  if (!document.getElementById('declined-toggle')) {
    createToggleButton();
  }
}, 5000);