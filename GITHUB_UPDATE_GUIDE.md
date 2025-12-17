# GitHub Update Guide - Version 2.0

This guide will walk you through updating your GitHub repository with the v2.0 release.

## Prerequisites

- Git installed on your computer
- GitHub account with repository access
- Terminal/Command Prompt access

## Step-by-Step Instructions

### 1. Navigate to Your Local Repository

```bash
cd /path/to/google-calendar-declined-events-toggle
```

Replace `/path/to/` with the actual path to your repository folder.

### 2. Check Current Status

```bash
git status
```

This shows which files have been modified or are untracked.

### 3. Pull Latest Changes (if working with others)

```bash
git pull origin main
```

Note: Replace `main` with `master` if that's your default branch name.

### 4. Replace Files with v2.0 Versions

Copy the downloaded files (README.md, content.js, manifest.json, styles.css, CONTRIBUTING.md, .gitignore, LICENSE) into your repository folder, replacing the existing files.

### 5. Stage All Changes

```bash
git add .
```

This stages all modified and new files for commit.

### 6. Commit the Changes

```bash
git commit -m "Release v2.0.0 - Native menu automation

- Complete rewrite using native menu automation instead of DOM manipulation
- Added automatic sync when returning from Settings page  
- Improved reliability with native menu interaction
- Better backdrop cleanup to prevent screen dimming issues
- Added error handling for Chrome extension context
- Removed all debugging console.log messages"
```

### 7. Push to GitHub

```bash
git push origin main
```

Again, replace `main` with `master` if needed.

### 8. Create a Release Tag (Optional but Recommended)

```bash
# Create and push a tag for v2.0.0
git tag -a v2.0.0 -m "Version 2.0.0 - Native Menu Automation"
git push origin v2.0.0
```

### 9. Create a GitHub Release (On GitHub Website)

1. Go to your repository on GitHub
2. Click on "Releases" in the right sidebar
3. Click "Create a new release"
4. Choose the `v2.0.0` tag you just created
5. Title: `v2.0.0 - Native Menu Automation`
6. Description:

```markdown
## 🎉 Version 2.0.0 - Major Update

This is a complete rewrite of the extension using a more robust approach.

### ✨ What's New

- **Native menu automation** - Extension now clicks the actual "Show declined events" checkbox in Google Calendar's menu
- **Auto-sync** - Toggle automatically syncs when you return from Settings page
- **Better reliability** - Uses Google's native setting system instead of CSS hiding
- **Improved stability** - Better error handling and backdrop cleanup

### 🔧 Changes

- Removed DOM manipulation and CSS hiding approach
- Added URL-based detection for Settings page navigation
- Implemented Escape key menu closing
- Added backdrop cleanup to prevent screen dimming
- Removed all debugging console messages
- Better Chrome extension context validation

### ⚠️ Breaking Changes

- Extension now takes ~1 second to toggle (due to menu automation)
- Brief menu flash visible during toggle operation
- These trade-offs ensure we're using Google's official setting mechanism

### 📝 Migration Notes

No action required - just reload the extension in `chrome://extensions/` and refresh Google Calendar.

### 🐛 Bug Fixes

- Fixed screen dimming issue after toggle
- Fixed sync issues after manual setting changes
- Fixed Chrome extension context invalidation errors

### 📚 Documentation

- Updated README with v2.0 approach explanation
- Updated CONTRIBUTING.md with new architecture details
```

7. Attach the extension files (manifest.json, content.js, styles.css) as release assets
8. Click "Publish release"

## Verification

After pushing, verify everything worked:

1. Visit your GitHub repository
2. Check that all files are updated
3. Verify the commit appears in the commit history
4. Check that the tag and release are visible

## Troubleshooting

### "Permission denied" error

```bash
# Make sure you're authenticated
git remote -v

# If using HTTPS, you may need to authenticate
# If using SSH, make sure your SSH key is added to GitHub
```

### "Merge conflict" error

```bash
# If you have conflicts, resolve them:
git status  # See which files have conflicts
# Edit the files to resolve conflicts
git add <resolved-files>
git commit -m "Resolved merge conflicts"
git push origin main
```

### Wrong branch

```bash
# Check which branch you're on
git branch

# Switch to main/master
git checkout main
```

## Quick Reference Commands

```bash
# Full update sequence
cd /path/to/repo
git pull origin main
# (Replace files here)
git add .
git commit -m "Release v2.0.0 - Native menu automation"
git push origin main
git tag -a v2.0.0 -m "Version 2.0.0"
git push origin v2.0.0
```

## Next Steps

After updating GitHub:

1. Update any documentation links
2. Announce the update to users (if you have a user base)
3. Monitor GitHub Issues for any problems
4. Consider submitting to Chrome Web Store

---

**Questions?** Check the main README.md or open a GitHub Issue.
