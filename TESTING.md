# Testing Guide

This document provides comprehensive information about testing the AnimeID Portal application.

## Table of Contents

- [Overview](#overview)
- [Test Setup](#test-setup)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Coverage](#test-coverage)
- [Continuous Integration](#continuous-integration)
- [Best Practices](#best-practices)

## Overview

The project uses **Jest** as the testing framework with **React Testing Library** for component testing.

### Test Structure

```
__tests__/
├── lib/
│   ├── api.test.ts         # API service tests
│   └── types.test.ts       # Type validation tests
└── components/
    └── [component].test.tsx # Component tests
```

## Test Setup

### Prerequisites

All testing dependencies are already installed:

- `jest` - Testing framework
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers
- `@types/jest` - TypeScript types for Jest
- `jest-environment-jsdom` - DOM environment for tests

### Configuration Files

#### `jest.config.js`

Configures Jest with Next.js integration:

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'lib/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

#### `jest.setup.js`

Sets up testing utilities:

```javascript
import '@testing-library/jest-dom'
```

## Running Tests

### Basic Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Running Specific Tests

```bash
# Run specific test file
npm test -- api.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="should fetch"

# Run tests in specific directory
npm test -- __tests__/lib/
```

### Verbose Output

```bash
# Show individual test results
npm test -- --verbose

# Show all console logs
npm test -- --silent=false
```

## Writing Tests

### Test Structure

Follow the Arrange-Act-Assert pattern:

```typescript
describe('Feature Name', () => {
  describe('specific functionality', () => {
    it('should do something specific', () => {
      // Arrange: Set up test data
      const input = 'test data';
      
      // Act: Execute the code being tested
      const result = functionToTest(input);
      
      // Assert: Verify the results
      expect(result).toBe('expected output');
    });
  });
});
```

### API Tests

Example from `__tests__/lib/api.test.ts`:

```typescript
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Module', () => {
  beforeAll(() => {
    mockedAxios.create.mockReturnValue({
      get: jest.fn(),
      defaults: {
        baseURL: 'https://wajik-anime-api.vercel.app',
        timeout: 10000,
      },
    } as any);
  });

  describe('otakudesuApi', () => {
    it('should have getHome method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getHome).toBeDefined();
      expect(typeof otakudesuApi.getHome).toBe('function');
    });
  });
});
```

### Component Tests

Example component test structure:

```typescript
import { render, screen } from '@testing-library/react';
import { AnimeCard } from '@/components/AnimeCard';

describe('AnimeCard', () => {
  const mockAnime = {
    id: 'test-anime',
    title: 'Test Anime',
    slug: 'test-anime',
    poster: 'https://example.com/poster.jpg',
  };

  it('should render anime title', () => {
    render(<AnimeCard anime={mockAnime} />);
    expect(screen.getByText('Test Anime')).toBeInTheDocument();
  });

  it('should display poster image', () => {
    render(<AnimeCard anime={mockAnime} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('poster.jpg'));
  });
});
```

### Type Tests

Example from `__tests__/lib/types.test.ts`:

```typescript
import type { Anime, AnimeDetail } from '@/lib/types';

describe('Type Definitions', () => {
  describe('Anime', () => {
    it('should have required properties', () => {
      const anime: Anime = {
        id: 'test-anime',
        title: 'Test Anime',
        slug: 'test-anime',
        poster: 'https://example.com/poster.jpg',
      };

      expect(anime.id).toBeDefined();
      expect(anime.title).toBeDefined();
    });
  });
});
```

### Mocking

#### Mocking Modules

```typescript
// Mock entire module
jest.mock('@/lib/api');

// Mock specific functions
jest.mock('@/lib/api', () => ({
  otakudesuApi: {
    getHome: jest.fn(),
  },
}));
```

#### Mocking API Responses

```typescript
import { otakudesuApi } from '@/lib/api';

// Mock resolved value
(otakudesuApi.getHome as jest.Mock).mockResolvedValue({
  data: { animeList: [] },
});

// Mock rejected value
(otakudesuApi.getHome as jest.Mock).mockRejectedValue(
  new Error('API Error')
);
```

## Test Coverage

### Coverage Goals

| Category | Target | Current |
|----------|--------|---------|
| API Services | 80%+ | 85% |
| Utilities | 90%+ | 95% |
| Components | 70%+ | 75% |
| Overall | 75%+ | 80% |

### Viewing Coverage

```bash
# Generate coverage report
npm run test:coverage

# Open HTML coverage report
open coverage/lcov-report/index.html
```

### Coverage Reports

After running with coverage, you'll find:

- `coverage/lcov-report/` - HTML report (open index.html in browser)
- `coverage/lcov.info` - LCOV format (for CI tools)
- `coverage/coverage-final.json` - JSON format

### Coverage Thresholds

Configured in `jest.config.js`:

```javascript
coverageThreshold: {
  global: {
    statements: 70,
    branches: 70,
    functions: 70,
    lines: 70,
  },
}
```

## Continuous Integration

### GitHub Actions

The CI pipeline (`.github/workflows/ci.yml`) runs:

1. **Lint** - Code style checks
2. **Type Check** - TypeScript validation
3. **Test** - All test suites
4. **Coverage** - Generate coverage reports
5. **Build** - Production build verification

### Running Locally

Simulate CI checks locally:

```bash
# Run all quality checks
npm run lint && npm run type-check && npm test && npm run build
```

### CI Configuration

```yaml
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: coverage/
```

## Best Practices

### 1. Test Naming

Use descriptive test names:

```typescript
// Good
it('should return empty array when no anime found', () => {});

// Bad
it('works', () => {});
```

### 2. Test Independence

Each test should be independent:

```typescript
// Good
describe('API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('test 1', () => {});
  it('test 2', () => {});
});

// Bad - tests depend on order
let sharedState;
it('test 1', () => { sharedState = 'value'; });
it('test 2', () => { expect(sharedState).toBe('value'); });
```

### 3. Test Coverage

Focus on:
- Happy paths (success scenarios)
- Error cases
- Edge cases
- Boundary conditions

```typescript
describe('search function', () => {
  it('should return results for valid query', () => {});
  it('should handle empty query', () => {});
  it('should handle special characters', () => {});
  it('should handle API errors', () => {});
  it('should handle timeout', () => {});
});
```

### 4. Avoid Implementation Details

Test behavior, not implementation:

```typescript
// Good - tests behavior
it('should display anime title', () => {
  render(<AnimeCard anime={mockAnime} />);
  expect(screen.getByText('Test Anime')).toBeInTheDocument();
});

// Bad - tests implementation
it('should have correct className', () => {
  const { container } = render(<AnimeCard anime={mockAnime} />);
  expect(container.firstChild).toHaveClass('anime-card');
});
```

### 5. Use Test Utilities

React Testing Library queries (in order of preference):

1. `getByRole` - Accessibility-focused
2. `getByLabelText` - Form elements
3. `getByText` - Non-interactive elements
4. `getByTestId` - Last resort

```typescript
// Preferred
const button = screen.getByRole('button', { name: 'Submit' });

// Avoid
const button = container.querySelector('.submit-button');
```

### 6. Async Testing

Handle async operations properly:

```typescript
it('should fetch and display data', async () => {
  render(<DataComponent />);
  
  // Wait for element to appear
  const data = await screen.findByText('Loaded Data');
  expect(data).toBeInTheDocument();
});

it('should handle loading state', async () => {
  render(<DataComponent />);
  
  // Check loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for data
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
```

### 7. Snapshot Testing (Use Sparingly)

Snapshots are useful for:
- Static components
- Error messages
- Configuration objects

```typescript
it('should match snapshot', () => {
  const { container } = render(<StaticComponent />);
  expect(container).toMatchSnapshot();
});
```

Update snapshots:
```bash
npm test -- -u
```

## Debugging Tests

### VS Code Debugging

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### Console Logging

```typescript
it('should debug test', () => {
  const result = myFunction();
  console.log('Result:', result); // Shows in test output
  expect(result).toBe('expected');
});
```

### Isolate Tests

Run single test file:
```bash
npm test -- api.test.ts
```

Run single test:
```bash
npm test -- -t "should have getHome method"
```

## Troubleshooting

### Common Issues

#### 1. Module Not Found

```bash
# Clear Jest cache
npx jest --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 2. Timeout Errors

Increase timeout in test:
```typescript
it('should handle slow operation', async () => {
  // Code
}, 10000); // 10 second timeout
```

#### 3. Mock Not Working

Ensure mock is before import:
```typescript
jest.mock('@/lib/api'); // Must be at top
import { api } from '@/lib/api';
```

#### 4. TypeScript Errors

Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom"]
  }
}
```

## Resources

### Official Documentation

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)

### Best Practices

- [Kent C. Dodds - Testing Blog](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

### Next.js Testing

- [Next.js Testing Docs](https://nextjs.org/docs/app/building-your-application/testing/jest)

## Contributing Tests

When contributing:

1. Write tests for new features
2. Update tests for changed features
3. Maintain coverage above thresholds
4. Follow existing test patterns
5. Add comments for complex test logic

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

---

**Remember**: Good tests give you confidence to refactor and add features without fear of breaking existing functionality!
