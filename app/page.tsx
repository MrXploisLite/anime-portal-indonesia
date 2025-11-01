'use client';

import { useEffect, useState } from 'react';
import { otakudesuApi, samehadakuApi } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { HomeDataResponse } from '@/lib/types';

export default function HomePage() {
  const [otakudesuData, setOtakudesuData] = useState<HomeDataResponse | null>(null);
  const [samehadakuData, setSamehadakuData] = useState<HomeDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState<'otakudesu' | 'samehadaku'>('otakudesu');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await Promise.allSettled([
          otakudesuApi.getHome(),
          samehadakuApi.getHome(),
        ]);
        
        if (results[0].status === 'fulfilled') {
          setOtakudesuData(results[0].value.data.data);
        } else {
          console.error('Error fetching Otakudesu data:', results[0].reason);
        }
        
        if (results[1].status === 'fulfilled') {
          setSamehadakuData(results[1].value.data.data);
        } else {
          console.error('Error fetching Samehadaku data:', results[1].reason);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const currentData = activeSource === 'otakudesu' ? otakudesuData : samehadakuData;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 gradient-bg bg-clip-text text-transparent">
          Selamat Datang di AnimeID 🎌
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Portal anime Indonesia terlengkap dengan subtitle Indonesia
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveSource('otakudesu')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeSource === 'otakudesu'
                ? 'bg-blue-600 text-white'
                : 'glass-effect hover:bg-white/10'
            }`}
          >
            Otakudesu
          </button>
          <button
            onClick={() => setActiveSource('samehadaku')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeSource === 'samehadaku'
                ? 'bg-purple-600 text-white'
                : 'glass-effect hover:bg-white/10'
            }`}
          >
            Samehadaku
          </button>
        </div>
      </section>

      {currentData?.ongoing && currentData.ongoing.length > 0 && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Anime Ongoing</h2>
            <Link
              href={`/${activeSource}/ongoing`}
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {currentData.ongoing.slice(0, 12).map((anime, index) => (
              <AnimeCard key={anime.slug || anime.id || `ongoing-${index}`} anime={anime} source={activeSource} />
            ))}
          </div>
        </section>
      )}

      {currentData?.completed && currentData.completed.length > 0 && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Anime Completed</h2>
            <Link
              href={`/${activeSource}/completed`}
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {currentData.completed.slice(0, 12).map((anime, index) => (
              <AnimeCard key={anime.slug || anime.id || `completed-${index}`} anime={anime} source={activeSource} />
            ))}
          </div>
        </section>
      )}

      {samehadakuData?.popular && activeSource === 'samehadaku' && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Anime Populer</h2>
            <Link
              href="/samehadaku/popular"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {samehadakuData.popular.slice(0, 12).map((anime, index) => (
              <AnimeCard key={anime.slug || anime.id || `popular-${index}`} anime={anime} source="samehadaku" />
            ))}
          </div>
        </section>
      )}

      <section className="glass-effect rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Fitur Portal AnimeID</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-4">
            <div className="text-4xl mb-2">🔥</div>
            <h4 className="font-semibold mb-2">Anime Terbaru</h4>
            <p className="text-sm text-gray-400">Update anime ongoing dan completed setiap hari</p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-2">🎬</div>
            <h4 className="font-semibold mb-2">Streaming & Download</h4>
            <p className="text-sm text-gray-400">Nonton online atau download dengan berbagai kualitas</p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-2">🇮🇩</div>
            <h4 className="font-semibold mb-2">Subtitle Indonesia</h4>
            <p className="text-sm text-gray-400">Semua anime dengan subtitle bahasa Indonesia</p>
          </div>
        </div>
      </section>
    </div>
  );
}
