'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { samehadakuApi } from '@/lib/api';
import Loading from '@/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import { AnimeDetail } from '@/lib/types';

export default function SamehadakuAnimeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await samehadakuApi.getAnimeDetail(id);
        setAnime(response.data.data);
      } catch (error) {
        console.error('Error fetching anime detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!anime) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-400">Anime tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glass-effect rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            {anime.poster && (
              <div className="relative aspect-[3/4]">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {anime.japaneseTitle && (
                <div>
                  <p className="text-gray-400 text-sm">Judul Jepang</p>
                  <p className="font-semibold">{anime.japaneseTitle}</p>
                </div>
              )}
              {anime.score && (
                <div>
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p className="font-semibold">⭐ {anime.score}</p>
                </div>
              )}
              {anime.type && (
                <div>
                  <p className="text-gray-400 text-sm">Tipe</p>
                  <p className="font-semibold">{anime.type}</p>
                </div>
              )}
              {anime.status && (
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className="font-semibold">{anime.status}</p>
                </div>
              )}
              {anime.totalEpisodes && (
                <div>
                  <p className="text-gray-400 text-sm">Total Episode</p>
                  <p className="font-semibold">{anime.totalEpisodes}</p>
                </div>
              )}
              {anime.duration && (
                <div>
                  <p className="text-gray-400 text-sm">Durasi</p>
                  <p className="font-semibold">{anime.duration}</p>
                </div>
              )}
              {anime.releasedOn && (
                <div>
                  <p className="text-gray-400 text-sm">Dirilis</p>
                  <p className="font-semibold">{anime.releasedOn}</p>
                </div>
              )}
              {anime.studio && (
                <div>
                  <p className="text-gray-400 text-sm">Studio</p>
                  <p className="font-semibold">{anime.studio}</p>
                </div>
              )}
            </div>

            {anime.genres && anime.genres.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Genre</p>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {anime.synopsis && (
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Sinopsis</p>
                <p className="text-sm leading-relaxed">{anime.synopsis}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {anime.episodes && anime.episodes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Daftar Episode</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {anime.episodes.map((episode) => (
              <Link
                key={episode.slug || episode.id}
                href={`/samehadaku/episode/${episode.slug || episode.id}`}
                className="glass-effect p-4 rounded-lg text-center hover:bg-white/10 transition anime-card"
              >
                <p className="font-semibold">Episode {episode.number || episode.episode}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {anime.batchId && (
        <div className="mt-8 text-center">
          <Link
            href={`/samehadaku/batch/${anime.batchId}`}
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition"
          >
            📥 Download Batch
          </Link>
        </div>
      )}
    </div>
  );
}
