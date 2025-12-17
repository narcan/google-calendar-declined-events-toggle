# Contributing to Google Calendar Declined Events Toggle

Thanks for your interest in contributing! This extension was built to solve a real workflow problem, and community contributions help keep it working and improving.

## How to Contribute

### Reporting Bugs

If the extension stops working or behaves unexpectedly:

1. **Check if it's a known issue** - Search existing [GitHub Issues](../../issues)
2. **Gather information:**
   - What happened vs. what you expected
   - Steps to reproduce
   - Chrome version (`chrome://version`)
   - Screenshot if relevant
   - Browser console errors (F12 â†’ Console tab)
3. **Create an issue** with:
   - Clear title describing the bug
   - Reproduction steps
   - Expected vs actual behavior
   - Environment details

### Suggesting Enhancements

Have an idea for improvement?

1. **Check existing issues** to see if it's already proposed
2. **Create a feature request** explaining:
   - The problem you're trying to solve
   - Your proposed solution
   - Alternative approaches considered
   - Why this benefits other users

### Code Contributions

#### Prerequisites

- Familiarity with JavaScript, Chrome Extensions, and DOM manipulation
- Chrome browser for testing
- Git for version control
- A Google Calendar account with declined events for testing

#### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/google-calendar-declined-events-toggle.git
   cd google-calendar-declined-events-toggle
   ```

2. **Load extension in Chrome**
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the cloned folder

3. **Make changes**
   - Edit `content.js`, `styles.css`, or `manifest.json`
   - Click refresh icon in `chrome://extensions/`
   - Refresh Google Calendar to test

4. **Test thoroughly**
   - Test in multiple calendar views (week, month, day, agenda)
   - Test with different event types
   - Test declined events visibility toggling
   - Check browser console for errors
   - Test on different screen sizes

#### Coding Guidelines

**JavaScript (content.js):**
- Use clear, descriptive variable names
- Add comments for complex logic
- Avoid global namespace pollution
- Use const/let (not var)
- Handle errors gracefully
- Optimize for performance (debounce, throttle)

**CSS (styles.css):**
- Follow existing naming conventions
- Support dark mode with `prefers-color-scheme`
- Consider accessibility (`prefers-reduced-motion`, `prefers-contrast`)
- Use relative units (rem, em) where appropriate
- Keep specificity low

**General:**
- Keep code clean and readable
- Don't add unnecessary dependencies
- Maintain backward compatibility when possible
- Update README.md if adding features

#### Commit Messages

Use clear, descriptive commit messages:

```
Good:
âœ… Fix: Handle declined events in month view
âœ… Feature: Add keyboard shortcut support
âœ… Performance: Reduce observer overhead by 40%
âœ… Docs: Update installation instructions

Bad:
âŒ fix bug
âŒ update code
âŒ changes
```

Format: `Type: Brief description`

Types:
- `Fix:` Bug fixes
- `Feature:` New functionality
- `Performance:` Performance improvements
- `Docs:` Documentation changes
- `Refactor:` Code restructuring
- `Style:` CSS/UI changes
- `Test:` Testing additions/changes

#### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following coding guidelines

3. **Test thoroughly** across:
   - Multiple calendar views
   - Different event types
   - Various screen sizes
   - Dark/light modes

4. **Update documentation**
   - Update README.md if needed
   - Add code comments
   - Update version in manifest.json if applicable

5. **Commit changes**
   ```bash
   git add .
   git commit -m "Feature: Add description of your changes"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template with:
     - What changed and why
     - Testing performed
     - Screenshots if UI changed
     - Any breaking changes

7. **Respond to feedback**
   - Address review comments
   - Make requested changes
   - Be open to suggestions

### Important: Google Calendar Changes

Google frequently updates Calendar's HTML structure, which can break this extension.

**If you notice the extension stopped working:**

1. Inspect Google Calendar's DOM structure
2. Identify what changed (classes, attributes, structure)
3. Update selectors in `content.js`
4. Test across all views
5. Submit a PR quickly to help other users

**Key areas to check:**
- Event container selectors (`data-eventchip`, `data-eventid`, etc.)
- Declined event indicators (`.XuJrye` text, aria-labels)
- Toggle button placement (date navigation structure)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what's best for the community
- Accept constructive criticism gracefully
- Show empathy toward others

### Unacceptable Behavior

- Harassment, trolling, or discriminatory comments
- Personal attacks or insults
- Publishing others' private information
- Spam or off-topic comments

## Questions?

- **General questions:** Open a GitHub Discussion
- **Bug reports:** Create an Issue
- **Security issues:** Email maintainer directly (don't open public issue)

## Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes
- GitHub's contributor graph

Thank you for helping make this extension better! ðŸŽ‰