'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { otakudesuApi } from '@/lib/api';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { EpisodeDetail } from '@/lib/types';

export default function OtakudesuEpisodePage() {
  const params = useParams();
  const id = params.id as string;
  const [episode, setEpisode] = useState<EpisodeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await otakudesuApi.getEpisode(id);
        setEpisode(response.data.data);
      } catch (error) {
        console.error('Error fetching episode:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!episode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-400">Episode tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glass-effect rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{episode.title}</h1>
        {episode.releasedOn && (
          <p className="text-gray-400 mb-4">Dirilis: {episode.releasedOn}</p>
        )}
        
        {episode.animeId && (
          <Link
            href={`/otakudesu/anime/${episode.animeId}`}
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition mb-6"
          >
            ← Kembali ke Detail Anime
          </Link>
        )}
      </div>

      {episode.streamServers && episode.streamServers.length > 0 && (
        <div className="glass-effect rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Server Streaming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {episode.streamServers.map((server, index) => (
              <Link
                key={index}
                href={server.url || `/otakudesu/server/${server.id}`}
                target={server.url ? "_blank" : undefined}
                rel={server.url ? "noopener noreferrer" : undefined}
                className="glass-effect p-4 rounded-lg text-center hover:bg-white/10 transition anime-card"
              >
                <p className="font-semibold">🎬 {server.name}</p>
                {server.quality && (
                  <p className="text-sm text-gray-400">{server.quality}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {episode.downloadLinks && episode.downloadLinks.length > 0 && (
        <div className="glass-effect rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Download Episode</h2>
          {episode.downloadLinks.map((downloadGroup, groupIndex) => (
            <div key={groupIndex} className="mb-6 last:mb-0">
              {downloadGroup.resolution && (
                <h3 className="text-xl font-semibold mb-3">{downloadGroup.resolution}</h3>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {downloadGroup.links?.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-effect p-3 rounded-lg text-center hover:bg-white/10 transition text-sm"
                  >
                    📥 {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {episode.prevEpisode && (
        <div className="mt-8 flex justify-between">
          <Link
            href={`/otakudesu/episode/${episode.prevEpisode.slug || episode.prevEpisode.id}`}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            ← Episode Sebelumnya
          </Link>
          {episode.nextEpisode && (
            <Link
              href={`/otakudesu/episode/${episode.nextEpisode.slug || episode.nextEpisode.id}`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Episode Selanjutnya →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
