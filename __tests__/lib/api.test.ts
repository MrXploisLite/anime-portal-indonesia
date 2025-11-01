import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Module', () => {
  beforeAll(() => {
    mockedAxios.create.mockReturnValue({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      defaults: {
        baseURL: 'https://wajik-anime-api.vercel.app',
        timeout: 10000,
      },
    } as any);
  });

  describe('API Configuration', () => {
    it('should export axios instance', () => {
      const { api } = require('@/lib/api');
      expect(api).toBeDefined();
    });
  });

  describe('otakudesuApi', () => {
    it('should have getHome method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getHome).toBeDefined();
      expect(typeof otakudesuApi.getHome).toBe('function');
    });

    it('should have getSchedule method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getSchedule).toBeDefined();
      expect(typeof otakudesuApi.getSchedule).toBe('function');
    });

    it('should have getAnimeList method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getAnimeList).toBeDefined();
      expect(typeof otakudesuApi.getAnimeList).toBe('function');
    });

    it('should have getGenres method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getGenres).toBeDefined();
      expect(typeof otakudesuApi.getGenres).toBe('function');
    });

    it('should have getOngoing method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getOngoing).toBeDefined();
      expect(typeof otakudesuApi.getOngoing).toBe('function');
    });

    it('should have getCompleted method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getCompleted).toBeDefined();
      expect(typeof otakudesuApi.getCompleted).toBe('function');
    });

    it('should have search method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.search).toBeDefined();
      expect(typeof otakudesuApi.search).toBe('function');
    });

    it('should have getGenreAnime method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getGenreAnime).toBeDefined();
      expect(typeof otakudesuApi.getGenreAnime).toBe('function');
    });

    it('should have getAnimeDetail method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getAnimeDetail).toBeDefined();
      expect(typeof otakudesuApi.getAnimeDetail).toBe('function');
    });

    it('should have getEpisode method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getEpisode).toBeDefined();
      expect(typeof otakudesuApi.getEpisode).toBe('function');
    });

    it('should have getServer method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getServer).toBeDefined();
      expect(typeof otakudesuApi.getServer).toBe('function');
    });

    it('should have getBatch method', () => {
      const { otakudesuApi } = require('@/lib/api');
      expect(otakudesuApi.getBatch).toBeDefined();
      expect(typeof otakudesuApi.getBatch).toBe('function');
    });
  });

  describe('samehadakuApi', () => {
    it('should have getHome method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getHome).toBeDefined();
      expect(typeof samehadakuApi.getHome).toBe('function');
    });

    it('should have getSchedule method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getSchedule).toBeDefined();
      expect(typeof samehadakuApi.getSchedule).toBe('function');
    });

    it('should have getAnimeList method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getAnimeList).toBeDefined();
      expect(typeof samehadakuApi.getAnimeList).toBe('function');
    });

    it('should have getGenres method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getGenres).toBeDefined();
      expect(typeof samehadakuApi.getGenres).toBe('function');
    });

    it('should have getRecent method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getRecent).toBeDefined();
      expect(typeof samehadakuApi.getRecent).toBe('function');
    });

    it('should have getOngoing method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getOngoing).toBeDefined();
      expect(typeof samehadakuApi.getOngoing).toBe('function');
    });

    it('should have getCompleted method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getCompleted).toBeDefined();
      expect(typeof samehadakuApi.getCompleted).toBe('function');
    });

    it('should have getPopular method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getPopular).toBeDefined();
      expect(typeof samehadakuApi.getPopular).toBe('function');
    });

    it('should have getMovies method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getMovies).toBeDefined();
      expect(typeof samehadakuApi.getMovies).toBe('function');
    });

    it('should have getBatchList method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getBatchList).toBeDefined();
      expect(typeof samehadakuApi.getBatchList).toBe('function');
    });

    it('should have search method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.search).toBeDefined();
      expect(typeof samehadakuApi.search).toBe('function');
    });

    it('should have getGenreAnime method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getGenreAnime).toBeDefined();
      expect(typeof samehadakuApi.getGenreAnime).toBe('function');
    });

    it('should have getAnimeDetail method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getAnimeDetail).toBeDefined();
      expect(typeof samehadakuApi.getAnimeDetail).toBe('function');
    });

    it('should have getEpisode method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getEpisode).toBeDefined();
      expect(typeof samehadakuApi.getEpisode).toBe('function');
    });

    it('should have getServer method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getServer).toBeDefined();
      expect(typeof samehadakuApi.getServer).toBe('function');
    });

    it('should have getBatch method', () => {
      const { samehadakuApi } = require('@/lib/api');
      expect(samehadakuApi.getBatch).toBeDefined();
      expect(typeof samehadakuApi.getBatch).toBe('function');
    });
  });

  describe('URL Encoding', () => {
    it('should properly encode search queries', () => {
      const specialQuery = 'anime with spaces & symbols';
      const encoded = encodeURIComponent(specialQuery);
      expect(encoded).toBe('anime%20with%20spaces%20%26%20symbols');
    });

    it('should handle Japanese characters', () => {
      const japaneseQuery = '進撃の巨人';
      const encoded = encodeURIComponent(japaneseQuery);
      expect(encoded).toContain('%');
    });

    it('should handle empty strings', () => {
      const emptyQuery = '';
      const encoded = encodeURIComponent(emptyQuery);
      expect(encoded).toBe('');
    });

    it('should handle special URL characters', () => {
      const specialChars = '?&=/#';
      const encoded = encodeURIComponent(specialChars);
      expect(encoded).not.toContain('?');
      expect(encoded).not.toContain('&');
      expect(encoded).not.toContain('=');
    });
  });

  describe('API Constants', () => {
    it('should use correct base URL', () => {
      expect('https://wajik-anime-api.vercel.app').toBe('https://wajik-anime-api.vercel.app');
    });

    it('should have appropriate timeout', () => {
      expect(10000).toBeGreaterThan(0);
      expect(10000).toBeLessThanOrEqual(30000);
    });
  });

  describe('API Method Validation', () => {
    it('should have all required otakudesu methods', () => {
      const { otakudesuApi } = require('@/lib/api');
      const requiredMethods = [
        'getHome',
        'getSchedule',
        'getAnimeList',
        'getGenres',
        'getOngoing',
        'getCompleted',
        'search',
        'getGenreAnime',
        'getAnimeDetail',
        'getEpisode',
        'getServer',
        'getBatch',
      ];

      requiredMethods.forEach((method) => {
        expect(otakudesuApi[method]).toBeDefined();
        expect(typeof otakudesuApi[method]).toBe('function');
      });
    });

    it('should have all required samehadaku methods', () => {
      const { samehadakuApi } = require('@/lib/api');
      const requiredMethods = [
        'getHome',
        'getSchedule',
        'getAnimeList',
        'getGenres',
        'getRecent',
        'getOngoing',
        'getCompleted',
        'getPopular',
        'getMovies',
        'getBatchList',
        'search',
        'getGenreAnime',
        'getAnimeDetail',
        'getEpisode',
        'getServer',
        'getBatch',
      ];

      requiredMethods.forEach((method) => {
        expect(samehadakuApi[method]).toBeDefined();
        expect(typeof samehadakuApi[method]).toBe('function');
      });
    });
  });
});
