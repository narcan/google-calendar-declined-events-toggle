# Google Calendar - Hide Declined Events Extension

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

## Installation

### From Source (Development)

1. **Download the extension files:**
   - `manifest.json`
   - `content.js`
   - `styles.css`

2. **Create extension folder:**
   ```bash
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

## Troubleshooting

### Toggle button doesn't appear

1. **Refresh the page** - The extension might load before Calendar is ready
2. **Check Developer mode** - Make sure the extension is enabled in `chrome://extensions/`
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

## Known Limitations

### By Design

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
├── content.js          # Main logic (menu automation, sync)
├── styles.css          # Toggle button styling
└── README.md          # This file
```

### Making Changes

1. Edit files in your extension folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Refresh Google Calendar to test

### Debugging

Open Chrome DevTools (F12) while on Google Calendar. The extension logs errors to help with debugging.

## Contributing

Found a bug or have an improvement?

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

Quick links:
- [Report a bug](../../issues/new)
- [Request a feature](../../issues/new)
- [View open issues](../../issues)

## License

MIT License - Feel free to modify and distribute

See [LICENSE](LICENSE) for details.

## Disclaimer

This is an unofficial extension not affiliated with Google. Google Calendar is a trademark of Google LLC.

The extension may stop working if Google updates their Calendar interface. Maintenance and updates depend on community support.

## Version History

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
- Dark mode support
- Responsive design

## Support

Issues? Questions?
- Check the Troubleshooting section above
- Inspect browser console for errors (F12)
- [Open an issue on GitHub](../../issues)

---

**Made with ❤️ for productivity**