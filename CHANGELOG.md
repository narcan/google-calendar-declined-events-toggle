# Changelog

All notable changes to this project are documented here.

## [2.0.6]
- No functional changes — the first "Cut Release" button run (v2.0.5) pushed its tag using the workflow's own `GITHUB_TOKEN`, which GitHub Actions deliberately excludes from triggering other workflows, so `release.yml` never fired for it. Fixed in the workflow itself (see repo history); this version bump gives it a clean tag to build from.

## [2.0.4]
- No functional changes — `v2.0.2` and `v2.0.3` were tagged against a commit that predated the release-workflow permissions fix, so their release builds failed and/or were mislabeled. This version bump gives the fixed workflow a clean tag to build from.

## [2.0.3]
- Fixed the release workflow's `GITHUB_TOKEN` lacking permission to create GitHub Releases (repo defaults to a read-only token; the workflow now explicitly requests `contents: write`)

## [2.0.2]
- Fixed the release pipeline: workflows lived in `github/workflows/` instead of `.github/workflows/`, so GitHub Actions never ran them
- Release ZIP now includes `icons/` (previously omitted, which broke the packaged extension) and `CHANGELOG.md`
- Simplified installation instructions to lead with downloading a release ZIP instead of manually copying files

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
