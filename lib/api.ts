import axios from 'axios';

const API_BASE_URL = 'https://wajik-anime-api.vercel.app';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const otakudesuApi = {
  getHome: () => api.get('/otakudesu/home'),
  getSchedule: () => api.get('/otakudesu/schedule'),
  getAnimeList: () => api.get('/otakudesu/anime'),
  getGenres: () => api.get('/otakudesu/genres'),
  getOngoing: (page: number = 1) => api.get(`/otakudesu/ongoing?page=${page}`),
  getCompleted: (page: number = 1) => api.get(`/otakudesu/completed?page=${page}`),
  search: (query: string) => api.get(`/otakudesu/search?q=${encodeURIComponent(query)}`),
  getGenreAnime: (genreId: string, page: number = 1) => api.get(`/otakudesu/genres/${genreId}?page=${page}`),
  getAnimeDetail: (animeId: string) => api.get(`/otakudesu/anime/${animeId}`),
  getEpisode: (episodeId: string) => api.get(`/otakudesu/episode/${episodeId}`),
  getServer: (serverId: string) => api.get(`/otakudesu/server/${serverId}`),
  getBatch: (batchId: string) => api.get(`/otakudesu/batch/${batchId}`),
};

export const samehadakuApi = {
  getHome: () => api.get('/samehadaku/home'),
  getSchedule: () => api.get('/samehadaku/schedule'),
  getAnimeList: () => api.get('/samehadaku/anime'),
  getGenres: () => api.get('/samehadaku/genres'),
  getRecent: (page: number = 1) => api.get(`/samehadaku/recent?page=${page}`),
  getOngoing: (page: number = 1, order: string = 'title') => api.get(`/samehadaku/ongoing?page=${page}&order=${order}`),
  getCompleted: (page: number = 1, order: string = 'title') => api.get(`/samehadaku/completed?page=${page}&order=${order}`),
  getPopular: (page: number = 1) => api.get(`/samehadaku/popular?page=${page}`),
  getMovies: (page: number = 1) => api.get(`/samehadaku/movies?page=${page}`),
  getBatchList: (page: number = 1) => api.get(`/samehadaku/batch?page=${page}`),
  search: (query: string, page: number = 1) => api.get(`/samehadaku/search?q=${encodeURIComponent(query)}&page=${page}`),
  getGenreAnime: (genreId: string, page: number = 1) => api.get(`/samehadaku/genres/${genreId}?page=${page}`),
  getAnimeDetail: (animeId: string) => api.get(`/samehadaku/anime/${animeId}`),
  getEpisode: (episodeId: string) => api.get(`/samehadaku/episode/${episodeId}`),
  getServer: (serverId: string) => api.get(`/samehadaku/server/${serverId}`),
  getBatch: (batchId: string) => api.get(`/samehadaku/batch/${batchId}`),
};
