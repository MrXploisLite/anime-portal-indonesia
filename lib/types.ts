export interface Anime {
  id: string;
  title: string;
  slug: string;
  poster: string;
  currentEpisode?: string;
  rating?: string;
  type?: string;
  status?: string;
  releasedOn?: string;
  score?: string;
}

export interface AnimeDetail extends Anime {
  otherTitles?: string[];
  japaneseTitle?: string;
  genres?: string[];
  synopsis?: string;
  episodes?: Episode[];
  batch?: BatchInfo;
  batchId?: string;
  studio?: string;
  duration?: string;
  season?: string;
  producers?: string[];
  totalEpisodes?: string;
}

export interface AnimeListResponse {
  animeList: Anime[];
  genre?: string;
}

export interface HomeDataResponse {
  ongoing?: Anime[];
  completed?: Anime[];
  popular?: Anime[];
  recent?: Anime[];
}

export interface ScheduleDay {
  day: string;
  animeList: Anime[];
}

export interface Episode {
  id: string;
  number?: string;
  episode?: string;
  title: string;
  date?: string;
  slug: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface Schedule {
  day: string;
  animeList: Anime[];
}

export interface ServerLink {
  id?: string;
  name: string;
  url?: string;
  quality?: string;
}

export interface BatchInfo {
  id: string;
  title: string;
  downloads?: DownloadLink[];
}

export interface DownloadLink {
  resolution: string;
  links: {
    name: string;
    url: string;
  }[];
}

export interface HomeData {
  ongoing?: Anime[];
  completed?: Anime[];
  recent?: Anime[];
  popular?: Anime[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface EpisodeDetail {
  id: string;
  title: string;
  releasedOn?: string;
  animeId?: string;
  streamServers?: ServerLink[];
  downloadLinks?: DownloadLink[];
  prevEpisode?: Episode;
  nextEpisode?: Episode;
}
