# Google Calendar - Hide Declined Events Extension

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

## Installation

### From Source (Development)

1. **Download the extension files:**
   - `manifest.json`
   - `content.js`
   - `styles.css`

2. **Create extension folder:**
   ```
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

## Troubleshooting

### Toggle button doesn't appear

1. **Refresh the page** - The extension might load before Calendar is ready
2. **Check Developer mode** - Make sure the extension is enabled in `chrome://extensions/`
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

## Known Limitations

### By Design

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
├── content.js          # Main logic (event detection, toggle)
├── styles.css          # Toggle button styling
└── README.md          # This file
```

### Making Changes

1. Edit files in your extension folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Refresh Google Calendar to test

### Debugging

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

## Contributing

Found a bug or have an improvement?

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

Quick links:
- [Report a bug](../../issues/new?template=bug_report.md)
- [Request a feature](../../issues/new?template=feature_request.md)
- [View open issues](../../issues)

## License

MIT License - Feel free to modify and distribute

## Disclaimer

This is an unofficial extension not affiliated with Google. Google Calendar is a trademark of Google LLC.

The extension may stop working if Google updates their Calendar interface. Maintenance and updates depend on community support.

## Version History

### v1.0.0 (Current)
- Initial release
- Basic show/hide functionality
- Performance optimizations
- Dark mode support
- Responsive design

## Support

Issues? Questions?
- Check the Troubleshooting section above
- Inspect browser console for errors
- Verify Calendar HTML hasn't changed

---

**Made with ❤️ for productivity**