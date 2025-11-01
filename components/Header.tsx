'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">
              🎌 AnimeID
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/ongoing" className="hover:text-blue-400 transition">
              Ongoing
            </Link>
            <Link href="/completed" className="hover:text-blue-400 transition">
              Completed
            </Link>
            <Link href="/genres" className="hover:text-blue-400 transition">
              Genres
            </Link>
            <Link href="/schedule" className="hover:text-blue-400 transition">
              Schedule
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anime..."
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition"
            />
          </form>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3">
            <Link
              href="/"
              className="block hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/ongoing"
              className="block hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ongoing
            </Link>
            <Link
              href="/completed"
              className="block hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Completed
            </Link>
            <Link
              href="/genres"
              className="block hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Genres
            </Link>
            <Link
              href="/schedule"
              className="block hover:text-blue-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Schedule
            </Link>
            <form onSubmit={handleSearch} className="mt-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime..."
                className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500"
              />
            </form>
          </div>
        )}
      </nav>
    </header>
  );
}
