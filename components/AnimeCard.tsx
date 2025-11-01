import Link from 'next/link';
import Image from 'next/image';
import { Anime } from '@/lib/types';

interface AnimeCardProps {
  anime: Anime;
  source?: 'otakudesu' | 'samehadaku';
}

export default function AnimeCard({ anime, source = 'otakudesu' }: AnimeCardProps) {
  return (
    <Link
      href={`/${source}/anime/${anime.slug || anime.id}`}
      className="anime-card block rounded-lg overflow-hidden glass-effect"
    >
      <div className="relative aspect-[3/4] bg-gray-800">
        {anime.poster && (
          <Image
            src={anime.poster}
            alt={anime.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            unoptimized
          />
        )}
        {anime.currentEpisode && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            {anime.currentEpisode}
          </div>
        )}
        {anime.score && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold">
            ⭐ {anime.score}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 mb-1" title={anime.title}>
          {anime.title}
        </h3>
        {anime.type && (
          <p className="text-xs text-gray-400">
            {anime.type} {anime.status && `• ${anime.status}`}
          </p>
        )}
      </div>
    </Link>
  );
}
