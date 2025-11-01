'use client';

import { useEffect, useState } from 'react';
import { otakudesuApi, samehadakuApi } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import Loading from '@/components/Loading';
import { Anime } from '@/lib/types';

export default function OngoingPage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeSource, setActiveSource] = useState<'otakudesu' | 'samehadaku'>('otakudesu');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = activeSource === 'otakudesu' 
          ? await otakudesuApi.getOngoing(page)
          : await samehadakuApi.getOngoing(page);
        const data = response.data.data.animeList || response.data.data;
        setAnimeList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching ongoing anime:', error);
        setAnimeList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, activeSource]);

  const handleSourceChange = (source: 'otakudesu' | 'samehadaku') => {
    setActiveSource(source);
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Anime Ongoing</h1>
        <p className="text-gray-400 mb-6">Anime yang sedang tayang saat ini</p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleSourceChange('otakudesu')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeSource === 'otakudesu'
                ? 'bg-blue-600 text-white'
                : 'glass-effect hover:bg-white/10'
            }`}
          >
            Otakudesu
          </button>
          <button
            onClick={() => handleSourceChange('samehadaku')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeSource === 'samehadaku'
                ? 'bg-purple-600 text-white'
                : 'glass-effect hover:bg-white/10'
            }`}
          >
            Samehadaku
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {animeList.map((anime, index) => (
              <AnimeCard key={anime.slug || anime.id || `anime-${index}`} anime={anime} source={activeSource} />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-6 py-3 rounded-lg glass-effect hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>
            <span className="px-6 py-3 glass-effect rounded-lg">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              className="px-6 py-3 rounded-lg glass-effect hover:bg-white/10 transition"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
