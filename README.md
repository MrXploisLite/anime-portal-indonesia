# AnimeID - Portal Anime Indonesia 🎌

Portal anime Indonesia yang menggunakan [Wajik Anime API](https://github.com/wajik45/wajik-anime-api) untuk menyediakan informasi anime terlengkap dengan subtitle Indonesia.

## 📋 Table of Contents

- [Features](#fitur-utama-)
- [Tech Stack](#tech-stack-)
- [Getting Started](#getting-started-)
- [Project Structure](#project-structure-)
- [API Usage](#api-usage-)
- [Testing](#testing-)
- [Development Guidelines](#development-guidelines-)
- [Deployment](#deployment-)
- [Contributing](#contributing-)
- [Documentation](#documentation-)
- [License](#license-)

## Fitur Utama ✨

- 🔥 **Anime Terbaru** - Update anime ongoing dan completed setiap hari
- 🎬 **Streaming & Download** - Nonton online atau download dengan berbagai kualitas
- 🇮🇩 **Subtitle Indonesia** - Semua anime dengan subtitle bahasa Indonesia
- 🎭 **Dua Sumber** - Otakudesu dan Samehadaku
- 🔍 **Pencarian** - Cari anime favorit dengan mudah
- 📅 **Jadwal Rilis** - Lihat jadwal rilis episode terbaru
- 🎨 **Genre** - Browse anime berdasarkan genre
- 📱 **Responsive Design** - Mobile, tablet, dan desktop friendly

## Tech Stack 🛠️

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **API**: [Wajik Anime API](https://wajik-anime-api.vercel.app)
- **HTTP Client**: Axios
- **Build Tool**: Turbopack (built-in Next.js)

## Getting Started 🚀

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm**: Comes with Node.js (or use yarn/pnpm)
- **Git**: For version control

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd anime-portal-indonesia
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open in browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run tests
npm test

# Run type checking
npm run type-check
```

### Environment Setup

The application uses an external API, so no environment variables are required for basic functionality. However, you can create a `.env.local` file for custom configurations:

```env
# Optional: Custom API base URL
NEXT_PUBLIC_API_BASE_URL=https://wajik-anime-api.vercel.app

# Optional: API timeout (milliseconds)
NEXT_PUBLIC_API_TIMEOUT=10000
```

## Project Structure 📁

```
anime-portal-indonesia/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── ongoing/                  # Ongoing anime (combined view)
│   │   └── page.tsx
│   ├── completed/                # Completed anime (combined view)
│   │   └── page.tsx
│   ├── genres/                   # All genres
│   │   └── page.tsx
│   ├── schedule/                 # Release schedule
│   │   └── page.tsx
│   ├── search/                   # Search results
│   │   └── page.tsx
│   ├── otakudesu/                # Otakudesu-specific routes
│   │   ├── anime/[id]/           # Anime detail page
│   │   ├── episode/[id]/         # Episode detail page
│   │   ├── genres/[id]/          # Genre anime list
│   │   ├── ongoing/              # Ongoing anime
│   │   └── completed/            # Completed anime
│   └── samehadaku/               # Samehadaku-specific routes
│       ├── anime/[id]/           # Anime detail page
│       ├── episode/[id]/         # Episode detail page
│       ├── genres/[id]/          # Genre anime list
│       ├── ongoing/              # Ongoing anime
│       ├── completed/            # Completed anime
│       └── popular/              # Popular anime
├── components/                   # Reusable React components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer component
│   ├── AnimeCard.tsx             # Anime card component
│   └── Loading.tsx               # Loading spinner
├── lib/                          # Utility functions
│   ├── api.ts                    # API client and functions
│   └── types.ts                  # TypeScript type definitions
├── public/                       # Static assets
│   └── favicon.ico
├── __tests__/                    # Test files
│   ├── lib/
│   │   └── api.test.ts
│   └── components/
│       └── AnimeCard.test.tsx
├── .github/                      # GitHub configuration
│   └── workflows/
│       └── ci.yml                # CI/CD pipeline
├── ARCHITECTURE.md               # Architecture documentation
├── QA_CHECKLIST.md              # Quality assurance notes
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
└── next.config.ts               # Next.js configuration
```

## API Usage 📚

### Data Sources

The application fetches data from the [Wajik Anime API](https://wajik-anime-api.vercel.app/), which provides two sources:

1. **Otakudesu** - Primary Indonesian anime source
2. **Samehadaku** - Secondary Indonesian anime source

### API Documentation

Full API documentation is available at: https://wajik-anime-api.vercel.app/

### Refreshing Data

The application fetches data in real-time from the API. To ensure fresh data:

1. **Automatic Updates**: The API is regularly updated by the maintainers
2. **Cache Invalidation**: Clear browser cache to force refresh
3. **Build Refresh**: Rebuild the application to clear server-side cache

```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

### API Rate Limiting

- Default timeout: 10 seconds per request
- No authentication required
- Rate limits enforced by the external API

### Offline Support

This is a server-rendered web application and requires an internet connection. For offline support considerations:

1. **Future Enhancement**: Service Worker implementation
2. **Progressive Web App**: Can be added for offline caching
3. **Data Persistence**: Local storage for favorites (not yet implemented)

## Testing 🧪

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- api.test.ts
```

### Test Structure

Tests are organized by feature:

```
__tests__/
├── lib/
│   └── api.test.ts           # API service tests
├── components/
│   ├── AnimeCard.test.tsx    # Component tests
│   └── Header.test.tsx
└── integration/
    └── search.test.ts        # Integration tests
```

### Writing Tests

Example test for API functions:

```typescript
import { otakudesuApi } from '@/lib/api';

describe('otakudesuApi', () => {
  it('should fetch anime list', async () => {
    const response = await otakudesuApi.getAnimeList();
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data.animeList)).toBe(true);
  });
});
```

### Test Coverage

Current test coverage targets:
- API services: 80%+
- Utility functions: 90%+
- Components: 70%+
- Integration: Key user flows

## Development Guidelines 🎯

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Consistent indentation (2 spaces)
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: JSDoc for public functions

### Type Safety

All API responses are typed:

```typescript
import type { Anime, AnimeDetail } from '@/lib/types';

// Type-safe API calls
const anime: Anime[] = await otakudesuApi.getOngoing(1);
```

### Error Handling

```typescript
try {
  const response = await otakudesuApi.getAnimeDetail(id);
  // Handle success
} catch (error) {
  // Handle error (network, timeout, etc.)
  console.error('Failed to fetch anime:', error);
}
```

### Adding New Features

1. Create types in `lib/types.ts`
2. Add API functions in `lib/api.ts`
3. Create page in `app/[feature]/page.tsx`
4. Add components to `components/`
5. Write tests in `__tests__/`

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push and create PR
git push origin feature/your-feature
```

## Deployment 🚀

### Vercel (Recommended)

1. **Connect Repository**:
   - Import project to Vercel
   - Auto-detected as Next.js

2. **Deploy**:
   - Automatic on push to main branch
   - Preview deployments for PRs

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t anime-portal .
docker run -p 3000:3000 anime-portal
```

### Traditional Hosting

1. Build the application:
```bash
npm run build
```

2. Upload files to server

3. Start with PM2:
```bash
pm2 start npm --name "anime-portal" -- start
```

### Environment Requirements

**Production**:
- Node.js 20+
- 512MB RAM minimum
- Stable internet connection
- HTTPS recommended

## Routes 🗺️

### Public Routes
- `/` - Homepage
- `/ongoing` - All ongoing anime (combined)
- `/completed` - All completed anime (combined)
- `/genres` - All genres
- `/schedule` - Release schedule
- `/search?q=query` - Search results

### Otakudesu Routes
- `/otakudesu/anime/[id]` - Anime detail
- `/otakudesu/episode/[id]` - Episode detail
- `/otakudesu/genres/[id]` - Genre anime list
- `/otakudesu/ongoing` - Ongoing anime
- `/otakudesu/completed` - Completed anime

### Samehadaku Routes
- `/samehadaku/anime/[id]` - Anime detail
- `/samehadaku/episode/[id]` - Episode detail
- `/samehadaku/genres/[id]` - Genre anime list
- `/samehadaku/ongoing` - Ongoing anime
- `/samehadaku/completed` - Completed anime
- `/samehadaku/popular` - Popular anime

## Documentation 📖

- **[Architecture](./ARCHITECTURE.md)** - System architecture and design patterns
- **[Features](./FEATURES.md)** - Detailed feature list
- **[QA Checklist](./QA_CHECKLIST.md)** - Testing scenarios and device compatibility
- **[API Docs](https://wajik-anime-api.vercel.app/)** - External API documentation

## Troubleshooting 🔧

### Common Issues

**Build Errors**:
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**API Timeouts**:
- Check internet connection
- Verify API is accessible: https://wajik-anime-api.vercel.app/
- Increase timeout in `lib/api.ts`

**TypeScript Errors**:
```bash
# Run type checking
npm run type-check
```

**Port Already in Use**:
```bash
# Use different port
PORT=3001 npm run dev
```

## Contributing 🤝

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Write/update tests**
5. **Run tests**: `npm test`
6. **Run linting**: `npm run lint`
7. **Commit changes**: `git commit -m 'feat: add amazing feature'`
8. **Push to branch**: `git push origin feature/amazing-feature`
9. **Open a Pull Request**

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process or auxiliary tool changes

## Performance 📊

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+
- **Bundle Size**: ~200KB (gzipped)

## Browser Support 🌐

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android 90+

## License 📄

This project is open source and available under the MIT License.

## Credits 🙏

- **API Provider**: [Wajik Anime API](https://github.com/wajik45/wajik-anime-api)
- **Data Sources**: Otakudesu & Samehadaku
- **Framework**: Next.js by Vercel
- **Styling**: Tailwind CSS

## Disclaimer ⚠️

This project is for educational purposes only. All anime content, trademarks, and images belong to their respective owners and studios. This application merely aggregates publicly available information through the Wajik Anime API.

## Support 💬

For issues and questions:
- **GitHub Issues**: [Create an issue](../../issues)
- **Documentation**: Check [ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Issues**: Report to [Wajik Anime API](https://github.com/wajik45/wajik-anime-api)

## Roadmap 🗓️

### Planned Features
- [ ] User authentication
- [ ] Favorites/Watchlist
- [ ] Watch history
- [ ] Comments and ratings
- [ ] Progressive Web App (PWA)
- [ ] Dark/Light mode toggle
- [ ] Advanced search filters
- [ ] Recommendation engine
- [ ] Email notifications for new episodes

### Performance Improvements
- [ ] Implement Redis caching
- [ ] Add service worker for offline support
- [ ] Optimize image loading
- [ ] Implement virtual scrolling for long lists

---

Made with ❤️ for the Indonesian anime community
