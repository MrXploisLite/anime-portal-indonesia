'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { otakudesuApi, samehadakuApi } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import Loading from '@/components/Loading';
import { Anime } from '@/lib/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState<'otakudesu' | 'samehadaku'>('otakudesu');

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = activeSource === 'otakudesu' 
          ? await otakudesuApi.search(query)
          : await samehadakuApi.search(query);
        setAnimeList(response.data.data.animeList || response.data.data || []);
      } catch (error) {
        console.error('Error searching anime:', error);
        setAnimeList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, activeSource]);

  const handleSourceChange = (source: 'otakudesu' | 'samehadaku') => {
    setActiveSource(source);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Hasil Pencarian</h1>
        {query && (
          <p className="text-gray-400 mb-6">
            Menampilkan hasil untuk: <span className="text-white font-semibold">{query}</span>
          </p>
        )}

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

      {!query ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Masukkan kata kunci untuk mencari anime</p>
        </div>
      ) : loading ? (
        <Loading />
      ) : animeList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Tidak ada hasil ditemukan untuk &quot;{query}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeList.map((anime) => (
            <AnimeCard key={anime.slug || anime.id} anime={anime} source={activeSource} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchContent />
    </Suspense>
  );
}
