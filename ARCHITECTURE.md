# Architecture Documentation

## Overview

AnimeID is a Next.js 16 web application that aggregates anime content from multiple Indonesian sources (Otakudesu and Samehadaku) through the Wajik Anime API. The application follows a modern server-side rendered architecture with client-side interactivity.

## Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router (React 19)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Build Tool**: Turbopack (Next.js built-in)

### Backend/API
- **Data Source**: Wajik Anime API (https://wajik-anime-api.vercel.app)
- **HTTP Client**: Axios
- **API Pattern**: RESTful API integration

## Architecture Patterns

### 1. App Router Structure

The application uses Next.js 16's App Router pattern, organizing routes by feature:

```
app/
├── page.tsx                    # Homepage (/)
├── layout.tsx                  # Root layout with metadata
├── globals.css                 # Global styles
├── [feature]/                  # Feature-based routing
│   └── page.tsx               # Feature page
└── [source]/                   # Source-specific routes
    ├── anime/[id]/            # Dynamic routes
    └── episode/[id]/
```

### 2. Data Flow

```
User Request → Next.js Route → API Service → External API → Data Transform → React Component → UI
```

**Detailed Flow**:
1. User navigates to a route (e.g., `/otakudesu/anime/one-piece`)
2. Next.js App Router matches the route to `app/otakudesu/anime/[id]/page.tsx`
3. Server component fetches data using `otakudesuApi.getAnimeDetail(id)`
4. Axios makes HTTP request to `https://wajik-anime-api.vercel.app/otakudesu/anime/one-piece`
5. Response is typed using TypeScript interfaces (`AnimeDetail`)
6. Data is passed to React components
7. UI is rendered on server and sent to client

### 3. Rendering Strategy

- **Server Components**: Default for all pages (data fetching, SEO)
- **Dynamic Rendering**: Used for pages with real-time data
- **Static Assets**: Images and styles served from `/public`

## Component Architecture

### Layer Structure

```
┌─────────────────────────────────────┐
│         Pages (app/*/page.tsx)      │  ← Route handlers, data fetching
├─────────────────────────────────────┤
│      Components (components/)       │  ← Reusable UI components
├─────────────────────────────────────┤
│      Services (lib/api.ts)          │  ← API abstraction layer
├─────────────────────────────────────┤
│      Types (lib/types.ts)           │  ← TypeScript definitions
└─────────────────────────────────────┘
```

### Component Hierarchy

```
Layout (Root)
├── Header
│   ├── Navigation
│   └── Search Bar
├── Main Content (Page-specific)
│   ├── AnimeCard (Reusable)
│   ├── Loading (State component)
│   └── Feature-specific components
└── Footer
```

## Data Formats

### API Response Structure

All API responses follow this pattern:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

### Core Data Models

#### Anime
```typescript
interface Anime {
  id: string;           // Unique identifier (slug)
  title: string;        // Display title
  slug: string;         // URL-friendly identifier
  poster: string;       // Image URL
  currentEpisode?: string;
  rating?: string;
  type?: string;        // TV, Movie, OVA, etc.
  status?: string;      // Ongoing, Completed
  releasedOn?: string;
}
```

#### AnimeDetail
Extended `Anime` with additional metadata:
```typescript
interface AnimeDetail extends Anime {
  genres?: string[];
  synopsis?: string;
  episodes?: Episode[];
  batch?: BatchInfo;     // Bulk download info
  studio?: string;
  duration?: string;
  season?: string;
}
```

#### Episode
```typescript
interface Episode {
  id: string;
  number?: string;
  title: string;
  date?: string;
  slug: string;
}
```

#### EpisodeDetail
```typescript
interface EpisodeDetail {
  id: string;
  title: string;
  streamServers?: ServerLink[];    // Streaming options
  downloadLinks?: DownloadLink[];  // Download options
  prevEpisode?: Episode;
  nextEpisode?: Episode;
}
```

## API Integration Strategy

### Dual-Source Architecture

The application supports two anime sources with a unified interface:

```
┌──────────────┐     ┌──────────────┐
│  Otakudesu   │     │ Samehadaku   │
│     API      │     │     API      │
└──────┬───────┘     └──────┬───────┘
       │                    │
       └────────┬───────────┘
                │
         ┌──────▼──────┐
         │  API Layer  │  ← lib/api.ts
         └──────┬──────┘
                │
         ┌──────▼──────┐
         │    Pages    │
         └─────────────┘
```

### API Service Pattern

Each source has a dedicated API object:

```typescript
export const otakudesuApi = {
  getHome: () => api.get('/otakudesu/home'),
  getAnimeDetail: (animeId: string) => api.get(`/otakudesu/anime/${animeId}`),
  // ... other methods
};

export const samehadakuApi = {
  getHome: () => api.get('/samehadaku/home'),
  getAnimeDetail: (animeId: string) => api.get(`/samehadaku/anime/${animeId}`),
  // ... other methods
};
```

### Error Handling

- API timeouts: 10 seconds (configurable in `lib/api.ts`)
- Network errors: Handled at component level
- Invalid responses: TypeScript type guards ensure data integrity

### Caching Strategy

- **Next.js Cache**: Server-side response caching
- **Browser Cache**: Standard HTTP caching headers
- **No Client-side Cache**: Fresh data on every request (can be optimized)

## Routing Structure

### Public Routes
- `/` - Homepage with combined sources
- `/ongoing` - All ongoing anime (combined view)
- `/completed` - All completed anime (combined view)
- `/genres` - Genre listing
- `/schedule` - Release schedule
- `/search?q={query}` - Search results

### Source-Specific Routes

**Otakudesu**:
- `/otakudesu/anime/[id]` - Anime detail
- `/otakudesu/episode/[id]` - Episode detail
- `/otakudesu/genres/[id]` - Genre anime list
- `/otakudesu/ongoing` - Ongoing anime
- `/otakudesu/completed` - Completed anime

**Samehadaku**:
- `/samehadaku/anime/[id]` - Anime detail
- `/samehadaku/episode/[id]` - Episode detail
- `/samehadaku/genres/[id]` - Genre anime list
- `/samehadaku/ongoing` - Ongoing anime
- `/samehadaku/completed` - Completed anime
- `/samehadaku/popular` - Popular anime

## Performance Considerations

### Optimization Strategies

1. **Server-Side Rendering**: Reduces client-side JavaScript
2. **Image Optimization**: Next.js automatic image optimization
3. **Code Splitting**: Automatic route-based code splitting
4. **Lazy Loading**: Components loaded on demand
5. **Turbopack**: Fast development builds

### Scalability

- **Horizontal Scaling**: Stateless design allows multiple instances
- **CDN Integration**: Static assets can be served via CDN
- **API Rate Limiting**: 10s timeout prevents cascading failures

## Security

### Current Implementation
- **No Authentication**: Public read-only application
- **HTTPS**: External API uses HTTPS
- **XSS Prevention**: React's built-in escaping
- **Input Sanitization**: URL encoding for search queries

### Future Considerations
- Implement rate limiting for search
- Add CORS policies if API is exposed
- Consider Content Security Policy (CSP)

## Development Workflow

### Local Development
```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm test         # Run test suite
```

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Formatting**: Consistent code style
- **Type Safety**: Full TypeScript coverage

## Deployment

### Build Output
```bash
npm run build
```
Generates optimized production build in `.next/` directory.

### Environment Requirements
- Node.js 20+
- 512MB+ RAM
- Network access to Wajik Anime API

### Deployment Platforms
- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: Supports Next.js
- **Docker**: Can be containerized
- **Traditional Hosting**: Node.js server required

## Monitoring and Observability

### Recommended Practices
- **Error Tracking**: Implement Sentry or similar
- **Performance Monitoring**: Next.js Analytics
- **API Monitoring**: Track external API response times
- **User Analytics**: Google Analytics or privacy-focused alternative

## Future Architecture Improvements

### Potential Enhancements
1. **Data Caching**: Implement Redis for API response caching
2. **Database**: Add PostgreSQL for user features (favorites, watchlist)
3. **Authentication**: NextAuth.js for user accounts
4. **Search Optimization**: Implement Algolia or Elasticsearch
5. **Progressive Web App**: Add service worker for offline support
6. **GraphQL Layer**: Unified API layer over multiple sources
7. **Microservices**: Separate API gateway service

## Diagrams

### System Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ HTTPS
       │
┌──────▼──────────────────────────┐
│       Next.js Application       │
│  ┌───────────────────────────┐  │
│  │     App Router Pages      │  │
│  └────────────┬──────────────┘  │
│               │                  │
│  ┌────────────▼──────────────┐  │
│  │    API Service Layer      │  │
│  │   (lib/api.ts)            │  │
│  └────────────┬──────────────┘  │
│               │                  │
│  ┌────────────▼──────────────┐  │
│  │    Axios HTTP Client      │  │
│  └────────────┬──────────────┘  │
└───────────────┼──────────────────┘
                │
                │ HTTPS
                │
┌───────────────▼──────────────────┐
│    Wajik Anime API               │
│    (External Service)            │
└───────────────┬──────────────────┘
                │
        ┌───────┴────────┐
        │                │
┌───────▼────────┐ ┌────▼───────────┐
│   Otakudesu    │ │  Samehadaku    │
│   (Scraper)    │ │   (Scraper)    │
└────────────────┘ └────────────────┘
```

### Data Flow Sequence

```
User → [Search "Naruto"]
  ↓
Next.js Router (/search?q=Naruto)
  ↓
Search Page Component
  ↓
otakudesuApi.search("Naruto")
  ↓
axios.get("/otakudesu/search?q=Naruto")
  ↓
Wajik Anime API
  ↓
{ success: true, data: { animeList: [...] } }
  ↓
TypeScript Type Validation
  ↓
React Component Rendering
  ↓
User sees search results
```

## Glossary

- **Otakudesu**: Indonesian anime website (source 1)
- **Samehadaku**: Indonesian anime website (source 2)
- **Wajik API**: Third-party API that scrapes anime sites
- **Batch**: Complete season download package
- **Episode**: Single anime episode with streaming/download links
- **Genre**: Anime category (Action, Romance, etc.)
- **Ongoing**: Currently airing anime
- **Completed**: Finished anime series
