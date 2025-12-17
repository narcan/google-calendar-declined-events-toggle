# Google Calendar - Hide Declined Events Extension

<<<<<<< HEAD
A Chrome extension that adds a toggle button to Google Calendar, allowing you to quickly show/hide declined events by automating the native "Show declined events" setting.

> 🤖 **Built with AI:** This extension was collaboratively developed with Claude Sonnet 4.5, showcasing the power of AI-assisted development for solving real workflow problems.

## Features

- ✅ **One-click toggle** - Changes Google Calendar's native "Show declined events" setting
- 🎯 **Native integration** - Works with Google's actual setting, not cosmetic hiding
- 🎨 **Seamless design** - Matches Google Calendar's design language
- 🔄 **Auto-sync** - Syncs with manual setting changes
- 💾 **Persistent** - Remembers your preference across sessions and devices
- 🌙 **Dark mode support** - Automatically adapts to your theme
- ♿ **Accessible** - Keyboard navigation and screen reader support
=======
A Chrome extension that adds a toggle button to Google Calendar, allowing you to quickly show/hide declined events without going into settings.

> 🤖 **Built with AI:** This extension was vibe-coded in collaboration with Claude Sonnet 4.5, showcasing the power of AI-assisted development for solving real workflow problems.

## Features

- ✅ **One-click toggle** - Show or hide declined events with a single click
- 🎨 **Native design** - Matches Google Calendar's design language
- 🚀 **Performance optimized** - Minimal resource usage with smart observers
- 📱 **Responsive** - Works on all screen sizes
- 🌙 **Dark mode support** - Automatically adapts to your theme
- ♿ **Accessible** - Keyboard navigation and screen reader support
- 💾 **Persistent** - Remembers your preference across sessions
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1

## Installation

### From Source (Development)

1. **Download the extension files:**
   - `manifest.json`
   - `content.js`
   - `styles.css`

2. **Create extension folder:**
<<<<<<< HEAD
   ```bash
=======
   ```
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1
   mkdir calendar-declined-toggle
   cd calendar-declined-toggle
   ```

3. **Place the three files** in the folder

4. **Load in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select your extension folder

### Chrome Web Store (Future)
*Not yet published*

## Usage

1. **Open Google Calendar** at [calendar.google.com](https://calendar.google.com)

<<<<<<< HEAD
2. **Find the toggle button:**
   - Look for "Declined Events" toggle next to the month/year dropdown
   - The toggle reflects the current state of Google Calendar's native setting

3. **Toggle visibility:**
   - Click the toggle to change the setting
   - The extension opens the "Filter and view" menu, clicks the native checkbox, and closes the menu automatically
   - Takes approximately 1 second to complete
   - The setting persists across all your devices via Google's sync
   - Page refreshes automatically to apply the change

4. **Manual changes sync automatically:**
   - If you change the setting manually via Settings → View options → "Show declined events"
   - The toggle will sync when you return to the calendar view

## How It Works

### Version 2.0 - Native Menu Automation

The extension automates Google Calendar's native "Show declined events" setting:

1. **Finds the "Filter and view" menu** (funnel icon in the toolbar)
2. **Opens the menu programmatically** by simulating a click
3. **Locates the "Show declined events" checkbox** in the menu
4. **Clicks the checkbox** if it needs to change state
5. **Closes the menu cleanly** using Escape key and backdrop cleanup
6. **Syncs automatically** when you return from Settings page

### Why Native Menu Automation?

We evaluated multiple approaches:

1. **Google Calendar API** ❌
   - The Calendar API doesn't expose "Show declined events" as a writable setting
   - Would require OAuth and complex authentication

2. **DOM Manipulation (v1.0)** ❌
   - Only cosmetically hides events with CSS
   - Breaks when Google updates their HTML structure
   - Events still load and consume resources

3. **Native Menu Automation (v2.0)** ✅ (Current approach)
   - Uses Google's actual setting system
   - More robust than pure DOM manipulation
   - Setting syncs across devices via Google
   - Proper page refresh applies changes correctly

**Trade-off:** This approach requires ~1 second to open the menu, click the checkbox, and close it. The menu briefly flashes open, but this ensures we're using Google's official setting mechanism.

### Performance

- ✅ Minimal resource usage (only active during toggle operation)
- ✅ ~1 second per toggle operation
- ✅ State syncs via Chrome storage (no polling)
- ✅ Button recreation check only every 5 seconds
- ✅ Auto-sync detects Settings page navigation
=======
2. **Enable "Show declined events" in Google Calendar settings:**
   - Click the gear icon (Settings) → Settings
   - Scroll to "View options"
   - Check "Show declined events"
   - ⚠️ **This is required** - the extension hides events that are already loaded

3. **Find the toggle button:**
   - Look for "Declined Events" toggle next to the month/year dropdown
   - By default, it's OFF (declined events are hidden)

4. **Toggle visibility:**
   - Click the toggle to show declined events
   - Click again to hide them
   - Your preference is automatically saved

## How It Works

### Technical Approach

The extension uses **DOM manipulation** to hide declined events:

1. **Detects declined events** by checking:
   - Text content for "Declined" keyword
   - ARIA labels
   - Visual styling (opacity patterns)

2. **Hides events** by applying CSS class (`declined-event-hidden`)

3. **Monitors changes** with optimized MutationObserver
   - Only watches the calendar content area
   - Debounced to reduce CPU usage
   - Pauses when tab is hidden

4. **Persists state** using Chrome storage sync

### Why DOM Manipulation?

We evaluated three approaches for this extension:

1. **Google Calendar API** ❌
   - The Calendar API doesn't expose "Show declined events" as a writable setting
   - Would require OAuth authentication and complex setup
   - The setting is only available in the client-side UI

2. **Simulating native toggle clicks** ❌
   - Even more fragile than DOM manipulation
   - Google's menu structure changes frequently
   - Could trigger unexpected side effects

3. **DOM manipulation** ✅ (Current approach)
   - Works immediately without authentication
   - Lightweight and performant
   - Simple for users to install
   - Can be quickly updated when Google changes their UI

**Trade-off:** This approach means the extension may break when Google updates Calendar's HTML structure. When this happens, the extension will need to be updated with new selectors. **Pull requests fixing these issues are greatly appreciated!** See [CONTRIBUTING.md](CONTRIBUTING.md) for how to help.

### Performance Optimizations

- ✅ Throttled visibility checks (100ms)
- ✅ Debounced mutation observer (150ms)
- ✅ Targeted DOM queries (not full page scans)
- ✅ Observer pauses on hidden tabs
- ✅ Selective mutation filtering (only event-related changes)
- ✅ Reduced button check interval (5 seconds vs 2)
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1

## Troubleshooting

### Toggle button doesn't appear

1. **Refresh the page** - The extension might load before Calendar is ready
2. **Check Developer mode** - Make sure the extension is enabled in `chrome://extensions/`
<<<<<<< HEAD
3. **Check console** - Open DevTools (F12) and look for errors

### Toggle takes a moment / brief menu flash

This is normal! The extension needs to:
1. Open the "Filter and view" menu (~200ms)
2. Find and click the checkbox (~300ms)  
3. Close the menu cleanly (~400ms)

The brief menu flash ensures we're using Google's native setting system.

### Toggle doesn't sync with manual changes

If you change the setting in Settings and the toggle doesn't update:
1. Make sure you're returning to the main calendar view (not staying in Settings)
2. The sync happens automatically when the URL changes from `/settings` back to calendar
3. Try refreshing the page if sync doesn't occur

### Extension stopped working after a Google Calendar update

Google may update Calendar's menu structure, breaking the extension temporarily:

1. **Check for extension updates** - Look for a newer version
2. **Report the issue** - [Create a bug report](../../issues/new)
3. **Help fix it** - See [CONTRIBUTING.md](CONTRIBUTING.md) for how to update selectors

**For developers:** The most common breakage points are:
- "Filter and view" button selector
- Menu item structure for "Show declined events" checkbox  
- Date navigation structure for button placement
=======
3. **Look in different positions** - Google Calendar's layout varies by screen size
4. **Check console** - Open DevTools (F12) and look for errors

### Declined events still showing

1. **Ensure toggle is OFF** - The toggle should be in the left position
2. **Verify Calendar setting** - "Show declined events" must be ON in Calendar settings
3. **Try refreshing** - Sometimes events load after the initial check
4. **Check event detection** - Some declined events might have non-standard markup

### Toggle disappears after navigation

- This is normal for Calendar's SPA navigation
- The extension checks every 5 seconds and recreates it
- Wait a few seconds or refresh the page

### Extension stopped working after a Google Calendar update

**This is the most common issue!** Google frequently updates Calendar's UI, which can break the extension's selectors.

1. **Check for extension updates** - Look for a newer version that fixes the issue
2. **Report the issue** - [Create a bug report](../../issues/new?template=bug_report.md) with details
3. **Help fix it** - If you're comfortable with JavaScript, see [CONTRIBUTING.md](CONTRIBUTING.md) for how to update the selectors and submit a PR

**For developers:** When Google updates break the extension, PRs with updated selectors are extremely valuable and help the entire community. The most common breakage points are:
- Event container selectors (`.XuJrye`, `[data-eventchip]`, etc.)
- Date navigation structure for button placement
- Declined event detection patterns

### Performance issues

1. **Disable when not needed** - Toggle ON to stop the observer
2. **Close unused calendar tabs** - Each tab runs the extension
3. **Check other extensions** - Conflicts can cause issues
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1

## Known Limitations

### By Design

<<<<<<< HEAD
- **~1 second operation time** - Opening/closing menus takes time
- **Brief menu flash** - You'll see the "Filter and view" menu briefly
- **Requires menu automation** - Depends on Google's menu structure
- **Chrome only** - Not compatible with Firefox/Edge (different APIs)

### Current Limitations

- **No keyboard shortcut** - Currently only accessible via mouse click
- **Single account** - Extension works with the primary Google account only (u/0)

### Maintenance Notes

⚠️ **This extension automates Google Calendar's menu interactions**, which can break during Google's UI updates:

- Menu selectors may need updating
- Toggle button placement may change
- Menu item structure may be modified

**When this happens:**
1. Check GitHub for updates or open issues
2. If no issue exists, [create one](../../issues/new)
=======
- **Requires Google's setting enabled** - The extension can only hide events that Google Calendar loads, so you must enable "Show declined events" in Calendar settings first
- **Visual hiding only** - Declined events still load from Google's servers (just hidden in the UI)
- **DOM-dependent** - **May break when Google updates Calendar's HTML structure.** This is the primary maintenance challenge. When it breaks, please [report it](../../issues) or submit a fix!
- **Chrome only** - Not compatible with Firefox/Edge (different extension APIs)

### Current Limitations

- **Calendar list sidebar** - Declined events may still show in left sidebar calendars
- **Search results** - Declined events may appear in search
- **Print view** - May not hide declined events when printing
- **Different views** - Some event types in month/agenda view might not be detected

### Maintenance Notes

⚠️ **This extension relies on Google Calendar's DOM structure**, which changes periodically during Google's UI updates. When Google pushes an update to Calendar:

- The extension may temporarily stop working
- Toggle button might disappear or appear in wrong location  
- Declined events might become visible again

**When this happens:**
1. Check GitHub for updates or open issues
2. If no issue exists, [create one](../../issues/new?template=bug_report.md)
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1
3. **Pull requests welcome!** Fixing selector updates helps everyone

## Browser Support

- ✅ Google Chrome (v88+)
- ✅ Chromium-based browsers (Edge, Brave, etc.)
- ❌ Firefox (requires different extension format)
- ❌ Safari (requires different extension format)

## Privacy

- ✅ No data collection
- ✅ No external network requests
- ✅ Only accesses `calendar.google.com`
- ✅ Settings stored locally in Chrome sync storage
- ✅ Open source - inspect the code yourself

## Development

### File Structure

```
calendar-declined-toggle/
├── manifest.json       # Extension configuration
<<<<<<< HEAD
├── content.js          # Main logic (menu automation, sync)
=======
├── content.js          # Main logic (event detection, toggle)
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1
├── styles.css          # Toggle button styling
└── README.md          # This file
```

### Making Changes

1. Edit files in your extension folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Refresh Google Calendar to test

### Debugging

<<<<<<< HEAD
Open Chrome DevTools (F12) while on Google Calendar. The extension logs errors to help with debugging.
=======
Open Chrome DevTools (F12) while on Google Calendar:

```javascript
// Check if extension loaded
console.log(document.getElementById('declined-toggle'));

// Check declined event detection
document.querySelectorAll('[data-eventchip]').forEach(el => {
  const label = el.querySelector('.XuJrye');
  if (label) console.log(label.textContent);
});

// Force visibility update
applyVisibility(); // (only works if script is in scope)
```

## Future Enhancements

Potential improvements:

- [ ] Multi-browser support (Firefox, Edge native)
- [ ] Better event detection (machine learning?)
- [ ] Keyboard shortcut to toggle
- [ ] Context menu integration
- [ ] Support for other event types (tentative, etc.)
- [ ] Settings page for customization
- [ ] Auto-detect and notify when Google breaks the extension
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1

## Contributing

Found a bug or have an improvement?

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

Quick links:
<<<<<<< HEAD
- [Report a bug](../../issues/new)
- [Request a feature](../../issues/new)
=======
- [Report a bug](../../issues/new?template=bug_report.md)
- [Request a feature](../../issues/new?template=feature_request.md)
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1
- [View open issues](../../issues)

## License

MIT License - Feel free to modify and distribute

<<<<<<< HEAD
See [LICENSE](LICENSE) for details.

=======
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1
## Disclaimer

This is an unofficial extension not affiliated with Google. Google Calendar is a trademark of Google LLC.

The extension may stop working if Google updates their Calendar interface. Maintenance and updates depend on community support.

## Version History

<<<<<<< HEAD
### v2.0.0 (Current)
- **Complete rewrite** - Now automates native "Show declined events" setting
- Added automatic sync when returning from Settings page
- Improved reliability with native menu interaction
- Better backdrop cleanup to prevent screen dimming issues
- Added error handling for Chrome extension context
- Removed all DOM manipulation and CSS hiding

### v1.0.0
- Initial release with DOM manipulation approach
- Basic show/hide functionality using CSS
=======
### v1.0.0 (Current)
- Initial release
- Basic show/hide functionality
- Performance optimizations
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1
- Dark mode support
- Responsive design

## Support

Issues? Questions?
- Check the Troubleshooting section above
<<<<<<< HEAD
- Inspect browser console for errors (F12)
- [Open an issue on GitHub](../../issues)
=======
- Inspect browser console for errors
- Verify Calendar HTML hasn't changed
>>>>>>> d4ca9448c8dcff6e701690914598c8391c6a6cd1

---

**Made with ❤️ for productivity**
