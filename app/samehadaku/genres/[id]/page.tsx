'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { samehadakuApi } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import Loading from '@/components/Loading';
import { Anime } from '@/lib/types';

export default function SamehadakuGenrePage() {
  const params = useParams();
  const id = params.id as string;
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [genreName, setGenreName] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await samehadakuApi.getGenreAnime(id, page);
        setAnimeList(response.data.data.animeList || response.data.data);
        setGenreName(response.data.data.genre || id);
      } catch (error) {
        console.error('Error fetching genre anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Genre: {genreName}</h1>
        <p className="text-gray-400">Anime dengan genre {genreName}</p>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {animeList.map((anime) => (
              <AnimeCard key={anime.slug || anime.id} anime={anime} source="samehadaku" />
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
