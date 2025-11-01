'use client';

import { useEffect, useState } from 'react';
import { otakudesuApi, samehadakuApi } from '@/lib/api';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { Genre } from '@/lib/types';

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState<'otakudesu' | 'samehadaku'>('otakudesu');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = activeSource === 'otakudesu' 
          ? await otakudesuApi.getGenres()
          : await samehadakuApi.getGenres();
        setGenres(response.data.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSource]);

  const handleSourceChange = (source: 'otakudesu' | 'samehadaku') => {
    setActiveSource(source);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Genre Anime</h1>
        <p className="text-gray-400 mb-6">Cari anime berdasarkan genre favorit kamu</p>

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.slug || genre.id}
              href={`/${activeSource}/genres/${genre.slug || genre.id}`}
              className="glass-effect p-4 rounded-lg text-center hover:bg-white/10 transition anime-card"
            >
              <h3 className="font-semibold">{genre.name}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
