# Contributing to AnimeID Portal

First off, thank you for considering contributing to AnimeID Portal! It's people like you that make this project better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

### Our Standards

**Examples of behavior that contributes to a positive environment:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**

- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm 10 or higher
- Git
- A GitHub account
- Basic knowledge of TypeScript and React

### Setup Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
```bash
git clone https://github.com/your-username/anime-portal-indonesia.git
cd anime-portal-indonesia
```

3. **Add upstream remote**:
```bash
git remote add upstream https://github.com/original-repo/anime-portal-indonesia.git
```

4. **Install dependencies**:
```bash
npm install
```

5. **Create a branch** for your work:
```bash
git checkout -b feature/your-feature-name
```

6. **Start development server**:
```bash
npm run dev
```

Visit http://localhost:3000 to see the app running.

## Development Process

### 1. Choose an Issue

- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to let others know you're working on it
- If no issue exists for your idea, create one first to discuss

### 2. Develop Your Changes

- Write clean, maintainable code
- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed
- Keep changes focused and atomic

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test

# Build the project
npm run build
```

All checks should pass before submitting a PR.

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

See [Commit Message Guidelines](#commit-message-guidelines) below.

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Open a Pull Request

- Go to the original repository on GitHub
- Click "New Pull Request"
- Select your fork and branch
- Fill out the PR template completely
- Link related issues

## Pull Request Process

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Self-review of your code completed
- [ ] Comments added to complex code sections
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added for new features
- [ ] All tests pass locally
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Build succeeds

### PR Requirements

1. **Title**: Use conventional commit format (e.g., `feat: add search filter`)
2. **Description**: Fill out the PR template completely
3. **Tests**: Include tests for new functionality
4. **Documentation**: Update relevant docs
5. **Single Purpose**: Each PR should address one concern

### Review Process

1. **Automated Checks**: CI/CD pipeline must pass
2. **Code Review**: At least one maintainer approval required
3. **Testing**: Reviewers will test your changes
4. **Discussion**: Address all review comments
5. **Approval**: Once approved, a maintainer will merge

### After Your PR is Merged

- Delete your feature branch
- Pull the latest changes from upstream
- Celebrate! 🎉

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Enable strict mode
- Define types for all functions and variables
- Avoid `any` type unless absolutely necessary

```typescript
// Good
function fetchAnime(id: string): Promise<Anime> {
  return otakudesuApi.getAnimeDetail(id);
}

// Bad
function fetchAnime(id: any): Promise<any> {
  return otakudesuApi.getAnimeDetail(id);
}
```

### React Components

- Use functional components
- Use React hooks
- Keep components small and focused
- Extract reusable logic into custom hooks

```tsx
// Good
export function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <div className="anime-card">
      <h3>{anime.title}</h3>
    </div>
  );
}

// Bad
export function AnimeCard(props: any) {
  return <div>{props.anime.title}</div>;
}
```

### Naming Conventions

- **Components**: PascalCase (`AnimeCard.tsx`)
- **Functions**: camelCase (`fetchAnimeList`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`Anime`, `ApiResponse`)
- **Files**: kebab-case for pages, PascalCase for components

### File Organization

```
app/                  # Pages
components/           # Reusable components
lib/                  # Utilities and services
  api.ts             # API functions
  types.ts           # Type definitions
  utils.ts           # Helper functions
__tests__/           # Test files
  lib/
  components/
```

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Required
- **Line Length**: Max 100 characters (soft limit)
- **Trailing Commas**: Yes (for multi-line)

### Comments

- Write self-documenting code when possible
- Add JSDoc comments for public APIs
- Explain "why" not "what"
- Keep comments up to date

```typescript
/**
 * Fetches anime details from the API
 * @param id - The anime ID (slug)
 * @returns Promise resolving to anime details
 */
async function getAnimeDetail(id: string): Promise<AnimeDetail> {
  // Use cache to reduce API calls
  const cached = cache.get(id);
  if (cached) return cached;
  
  const response = await otakudesuApi.getAnimeDetail(id);
  cache.set(id, response.data);
  return response.data;
}
```

## Testing Guidelines

### Writing Tests

- Write tests for all new features
- Test both happy paths and edge cases
- Use descriptive test names
- Keep tests isolated and independent

### Test Structure

```typescript
describe('Component/Function Name', () => {
  describe('specific feature', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = myFunction(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Coverage Goals

- API services: 80%+
- Utility functions: 90%+
- Components: 70%+
- Overall: 75%+

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (for development)
npm run test:watch

# With coverage
npm run test:coverage
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring (no functional changes)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes
- **ci**: CI/CD changes

### Examples

```bash
# Simple feature
feat: add search filter for genres

# Bug fix with issue reference
fix: resolve image loading issue on mobile

Fixes #123

# Breaking change
feat!: update API response format

BREAKING CHANGE: The API now returns data in a different structure.
Clients need to update their response handlers.
```

### Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor" not "moves cursor")
- First line max 72 characters
- Capitalize first letter
- No period at the end of subject line
- Separate subject from body with blank line
- Wrap body at 72 characters
- Explain what and why, not how

## Issue Guidelines

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check documentation** for answers
3. **Verify the issue** in the latest version
4. **Collect information** about your environment

### Issue Types

Use the appropriate issue template:

- **Bug Report**: For reporting bugs
- **Feature Request**: For suggesting new features
- **Performance Issue**: For performance problems
- **Question**: For asking questions

### Writing Good Issues

**Good Issue:**
```
Title: Search returns incorrect results for Japanese characters

Description:
When searching for anime using Japanese characters (e.g., "進撃の巨人"),
the search returns no results or incorrect results.

Steps to reproduce:
1. Navigate to search page
2. Enter "進撃の巨人" in search box
3. Press enter
4. Observe incorrect or missing results

Expected: Should return "Attack on Titan"
Actual: Returns no results

Environment:
- Browser: Chrome 120
- OS: Windows 11
- Version: 1.0.0
```

**Bad Issue:**
```
Title: Search broken

Description:
Search doesn't work.
```

### Issue Etiquette

- Be respectful and professional
- Provide all requested information
- Respond to questions from maintainers
- Update the issue if you find new information
- Close the issue if you resolve it yourself

## Best Practices

### Performance

- Optimize images and assets
- Minimize API calls
- Use React memoization when appropriate
- Lazy load components when possible
- Profile before optimizing

### Security

- Never commit sensitive data (API keys, passwords)
- Sanitize user input
- Use HTTPS for external requests
- Keep dependencies updated
- Review security advisories

### Accessibility

- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios

### Responsive Design

- Test on multiple screen sizes
- Use mobile-first approach
- Test touch interactions
- Consider network conditions

## Getting Help

If you need help with contributing:

1. **Read the documentation**
   - README.md
   - ARCHITECTURE.md
   - QA_CHECKLIST.md

2. **Ask questions**
   - Open a question issue
   - Use discussions (if enabled)
   - Comment on related issues

3. **Join the community**
   - Follow the project on GitHub
   - Watch for updates
   - Help others when you can

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes (for significant contributions)
- Project credits

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AnimeID Portal! 🎉

Your contributions help make this project better for the entire Indonesian anime community. We appreciate your time and effort!
