# Privacy Policy

**Hide Declined Calendar Events** does not collect, store, transmit, or share any user data.

## What the extension does

The extension runs a content script on `calendar.google.com` that adds a toggle button next to the date navigation. Clicking it opens Google Calendar's own "Filter and view" menu, clicks the native "Show declined events" checkbox, and closes the menu — it automates a setting that already exists in Google Calendar's UI.

## Data collected

None. The extension does not:
- Collect or transmit any personal information, calendar content, or browsing activity
- Make any network requests to any server (its own or third-party)
- Use analytics, tracking, or advertising of any kind

## Data stored

The extension stores a single boolean value (whether declined events are currently shown) using the `chrome.storage.sync` API. This is:
- Stored locally by Chrome and synced across your own signed-in devices via your Google account, the same way Chrome syncs other extension settings
- Never accessible to the extension developer or any third party
- The only thing the `storage` permission (the only permission this extension requests) is used for

## Permissions

| Permission | Why it's needed |
|---|---|
| `storage` | Remember your show/hide preference across sessions and devices |
| Host access to `calendar.google.com` | Required for the content script to add the toggle button and interact with Google Calendar's own menu |

## Changes to this policy

Any changes to this policy will be reflected in this file and in the extension's version history (see [CHANGELOG.md](CHANGELOG.md)).

## Contact

Questions? [Open an issue on GitHub](../../issues).
