# AnimeID - Portal Anime Indonesia 🎌

Portal anime Indonesia yang menggunakan [Wajik Anime API](https://github.com/wajik45/wajik-anime-api) untuk menyediakan informasi anime terlengkap dengan subtitle Indonesia.

## Fitur Utama ✨

- 🔥 **Anime Terbaru** - Update anime ongoing dan completed setiap hari
- 🎬 **Streaming & Download** - Nonton online atau download dengan berbagai kualitas
- 🇮🇩 **Subtitle Indonesia** - Semua anime dengan subtitle bahasa Indonesia
- 🎭 **Dua Sumber** - Otakudesu dan Samehadaku
- 🔍 **Pencarian** - Cari anime favorit dengan mudah
- 📅 **Jadwal Rilis** - Lihat jadwal rilis episode terbaru
- 🎨 **Genre** - Browse anime berdasarkan genre

## Tech Stack 🛠️

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **API**: Wajik Anime API
- **HTTP Client**: Axios

## Sumber Data 📊

### Otakudesu
- Home page
- Ongoing & Completed anime
- Jadwal rilis
- Genre
- Search
- Detail anime & episode
- Batch download

### Samehadaku
- Home page
- Recent, Ongoing, Completed, Popular anime
- Movies & Batch
- Jadwal rilis
- Genre
- Search
- Detail anime & episode

## Struktur Direktori 📁

```
.
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── ongoing/                  # Ongoing anime (combined view)
│   ├── completed/                # Completed anime (combined view)
│   ├── genres/                   # All genres
│   ├── schedule/                 # Release schedule
│   ├── search/                   # Search results
│   ├── otakudesu/                # Otakudesu specific routes
│   │   ├── anime/[id]/           # Anime detail
│   │   ├── episode/[id]/         # Episode detail
│   │   ├── genres/[id]/          # Genre anime list
│   │   ├── ongoing/              # Ongoing anime
│   │   └── completed/            # Completed anime
│   └── samehadaku/               # Samehadaku specific routes
│       ├── anime/[id]/           # Anime detail
│       ├── episode/[id]/         # Episode detail
│       ├── genres/[id]/          # Genre anime list
│       ├── ongoing/              # Ongoing anime
│       ├── completed/            # Completed anime
│       └── popular/              # Popular anime
├── components/                   # React components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   ├── AnimeCard.tsx             # Anime card component
│   └── Loading.tsx               # Loading spinner
├── lib/                          # Utilities
│   ├── api.ts                    # API functions
│   └── types.ts                  # TypeScript types
└── public/                       # Static assets
```

## Getting Started 🚀

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## API Documentation 📚

API Documentation: https://wajik-anime-api.vercel.app/

## Routes 🗺️

### Public Routes
- `/` - Homepage
- `/ongoing` - All ongoing anime
- `/completed` - All completed anime
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

## Features Details 📝

### Homepage
- Switch between Otakudesu and Samehadaku sources
- View ongoing and completed anime
- Quick access to popular anime (Samehadaku)
- Feature highlights

### Anime Detail Page
- Full anime information
- Poster image
- Genres, status, rating, etc.
- Episode list
- Batch download link

### Episode Page
- Streaming servers
- Download links (multiple quality options)
- Navigation to next/previous episodes
- Back to anime detail

### Search
- Search anime by title
- Switch between sources
- Real-time results

### Responsive Design
- Mobile-friendly
- Tablet optimized
- Desktop layout

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open source and available under the MIT License.

## Credits 🙏

- API Provider: [Wajik Anime API](https://github.com/wajik45/wajik-anime-api)
- Data Sources: Otakudesu & Samehadaku

## Disclaimer ⚠️

This project is for educational purposes only. All anime content belongs to their respective owners and studios.
