'use client';

import { useEffect, useState } from 'react';
import { otakudesuApi, samehadakuApi } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import Loading from '@/components/Loading';
import { ScheduleDay } from '@/lib/types';

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState<'otakudesu' | 'samehadaku'>('otakudesu');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = activeSource === 'otakudesu' 
          ? await otakudesuApi.getSchedule()
          : await samehadakuApi.getSchedule();
        const data = response.data.data;
        setSchedule(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setSchedule([]);
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
        <h1 className="text-4xl font-bold mb-4">Jadwal Rilis Anime</h1>
        <p className="text-gray-400 mb-6">Jadwal rilis episode terbaru</p>

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
        <div className="space-y-8">
          {schedule.map((daySchedule, index) => (
            <div key={index} className="glass-effect p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">{daySchedule.day}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {daySchedule.animeList?.map((anime, animeIndex) => (
                  <AnimeCard key={anime.slug || anime.id || `anime-${animeIndex}`} anime={anime} source={activeSource} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
