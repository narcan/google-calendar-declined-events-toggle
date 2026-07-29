# Changelog

All notable changes to this project are documented here.

## [2.0.1]
- Improved selector stability - prioritize semantic selectors over obfuscated class names
- Added date pattern matching for button placement
- Removed unnecessary obfuscated selector fallbacks
- Optimized search performance for faster button appearance
- Filter button now uses only ARIA label (more stable)

## [2.0.0]
- **Complete rewrite** - now automates native "Show declined events" setting
- Added automatic sync when returning from Settings page
- Improved reliability with native menu interaction
- Better backdrop cleanup to prevent screen dimming issues
- Added error handling for Chrome extension context
- Removed all DOM manipulation and CSS hiding

## [1.0.0]
- Initial release with DOM manipulation approach
- Basic show/hide functionality using CSS
- Dark mode support
- Responsive design
