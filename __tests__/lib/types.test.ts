import type {
  Anime,
  AnimeDetail,
  Episode,
  EpisodeDetail,
  Genre,
  ServerLink,
  DownloadLink,
  BatchInfo,
  ApiResponse,
  HomeData,
  Schedule,
} from '@/lib/types';

describe('Type Definitions', () => {
  describe('Anime', () => {
    it('should have required properties', () => {
      const anime: Anime = {
        id: 'test-anime',
        title: 'Test Anime',
        slug: 'test-anime',
        poster: 'https://example.com/poster.jpg',
      };

      expect(anime.id).toBeDefined();
      expect(anime.title).toBeDefined();
      expect(anime.slug).toBeDefined();
      expect(anime.poster).toBeDefined();
    });

    it('should allow optional properties', () => {
      const anime: Anime = {
        id: 'test-anime',
        title: 'Test Anime',
        slug: 'test-anime',
        poster: 'https://example.com/poster.jpg',
        currentEpisode: 'Episode 1',
        rating: '8.5',
        type: 'TV',
        status: 'Ongoing',
        releasedOn: '2024',
        score: '8.5',
      };

      expect(anime.currentEpisode).toBe('Episode 1');
      expect(anime.rating).toBe('8.5');
      expect(anime.type).toBe('TV');
      expect(anime.status).toBe('Ongoing');
      expect(anime.releasedOn).toBe('2024');
      expect(anime.score).toBe('8.5');
    });
  });

  describe('AnimeDetail', () => {
    it('should extend Anime interface', () => {
      const animeDetail: AnimeDetail = {
        id: 'test-anime',
        title: 'Test Anime',
        slug: 'test-anime',
        poster: 'https://example.com/poster.jpg',
        genres: ['Action', 'Adventure'],
        synopsis: 'A test anime',
        episodes: [],
        studio: 'Test Studio',
        duration: '24 min',
        season: 'Spring 2024',
        producers: ['Producer A', 'Producer B'],
        totalEpisodes: '12',
      };

      expect(animeDetail.genres).toBeInstanceOf(Array);
      expect(animeDetail.synopsis).toBeDefined();
      expect(animeDetail.episodes).toBeInstanceOf(Array);
    });
  });

  describe('Episode', () => {
    it('should have required properties', () => {
      const episode: Episode = {
        id: 'episode-1',
        title: 'Episode 1',
        slug: 'episode-1',
      };

      expect(episode.id).toBeDefined();
      expect(episode.title).toBeDefined();
      expect(episode.slug).toBeDefined();
    });

    it('should allow optional properties', () => {
      const episode: Episode = {
        id: 'episode-1',
        title: 'Episode 1',
        slug: 'episode-1',
        number: '1',
        episode: '1',
        date: '2024-01-15',
      };

      expect(episode.number).toBe('1');
      expect(episode.episode).toBe('1');
      expect(episode.date).toBe('2024-01-15');
    });
  });

  describe('EpisodeDetail', () => {
    it('should have required properties', () => {
      const episodeDetail: EpisodeDetail = {
        id: 'episode-1',
        title: 'Episode 1',
      };

      expect(episodeDetail.id).toBeDefined();
      expect(episodeDetail.title).toBeDefined();
    });

    it('should allow optional properties', () => {
      const episodeDetail: EpisodeDetail = {
        id: 'episode-1',
        title: 'Episode 1',
        releasedOn: '2024-01-15',
        animeId: 'test-anime',
        streamServers: [],
        downloadLinks: [],
        prevEpisode: {
          id: 'episode-0',
          title: 'Prologue',
          slug: 'episode-0',
        },
        nextEpisode: {
          id: 'episode-2',
          title: 'Episode 2',
          slug: 'episode-2',
        },
      };

      expect(episodeDetail.streamServers).toBeInstanceOf(Array);
      expect(episodeDetail.downloadLinks).toBeInstanceOf(Array);
      expect(episodeDetail.prevEpisode).toBeDefined();
      expect(episodeDetail.nextEpisode).toBeDefined();
    });
  });

  describe('Genre', () => {
    it('should have required properties', () => {
      const genre: Genre = {
        id: 'action',
        name: 'Action',
        slug: 'action',
      };

      expect(genre.id).toBe('action');
      expect(genre.name).toBe('Action');
      expect(genre.slug).toBe('action');
    });
  });

  describe('ServerLink', () => {
    it('should have required name property', () => {
      const serverLink: ServerLink = {
        name: 'Server 1',
      };

      expect(serverLink.name).toBe('Server 1');
    });

    it('should allow optional properties', () => {
      const serverLink: ServerLink = {
        id: 'server-1',
        name: 'Server 1',
        url: 'https://example.com/stream',
        quality: '720p',
      };

      expect(serverLink.id).toBe('server-1');
      expect(serverLink.url).toBeDefined();
      expect(serverLink.quality).toBe('720p');
    });
  });

  describe('DownloadLink', () => {
    it('should have required properties', () => {
      const downloadLink: DownloadLink = {
        resolution: '720p',
        links: [
          {
            name: 'Google Drive',
            url: 'https://example.com/download',
          },
        ],
      };

      expect(downloadLink.resolution).toBe('720p');
      expect(downloadLink.links).toBeInstanceOf(Array);
      expect(downloadLink.links[0].name).toBe('Google Drive');
      expect(downloadLink.links[0].url).toBeDefined();
    });
  });

  describe('BatchInfo', () => {
    it('should have required properties', () => {
      const batchInfo: BatchInfo = {
        id: 'batch-1',
        title: 'Batch Download',
      };

      expect(batchInfo.id).toBe('batch-1');
      expect(batchInfo.title).toBe('Batch Download');
    });

    it('should allow downloads property', () => {
      const batchInfo: BatchInfo = {
        id: 'batch-1',
        title: 'Batch Download',
        downloads: [
          {
            resolution: '720p',
            links: [],
          },
        ],
      };

      expect(batchInfo.downloads).toBeInstanceOf(Array);
    });
  });

  describe('ApiResponse', () => {
    it('should be generic type', () => {
      const response: ApiResponse<Anime[]> = {
        success: true,
        data: [
          {
            id: 'anime-1',
            title: 'Anime 1',
            slug: 'anime-1',
            poster: 'poster.jpg',
          },
        ],
      };

      expect(response.success).toBe(true);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should allow message property', () => {
      const response: ApiResponse<string> = {
        success: false,
        data: '',
        message: 'Error occurred',
      };

      expect(response.message).toBe('Error occurred');
    });
  });

  describe('HomeData', () => {
    it('should have optional anime arrays', () => {
      const homeData: HomeData = {
        ongoing: [],
        completed: [],
        recent: [],
        popular: [],
      };

      expect(homeData.ongoing).toBeInstanceOf(Array);
      expect(homeData.completed).toBeInstanceOf(Array);
      expect(homeData.recent).toBeInstanceOf(Array);
      expect(homeData.popular).toBeInstanceOf(Array);
    });

    it('should allow partial data', () => {
      const homeData: HomeData = {
        ongoing: [],
      };

      expect(homeData.ongoing).toBeDefined();
      expect(homeData.completed).toBeUndefined();
    });
  });

  describe('Schedule', () => {
    it('should have required properties', () => {
      const schedule: Schedule = {
        day: 'Monday',
        animeList: [],
      };

      expect(schedule.day).toBe('Monday');
      expect(schedule.animeList).toBeInstanceOf(Array);
    });
  });
});

describe('Type Compatibility', () => {
  it('should allow AnimeDetail to be used as Anime', () => {
    const animeDetail: AnimeDetail = {
      id: 'test',
      title: 'Test',
      slug: 'test',
      poster: 'poster.jpg',
      genres: ['Action'],
    };

    const anime: Anime = animeDetail;
    expect(anime.id).toBe('test');
  });

  it('should handle nullable properties', () => {
    const anime: Anime = {
      id: 'test',
      title: 'Test',
      slug: 'test',
      poster: 'poster.jpg',
      currentEpisode: undefined,
      rating: undefined,
    };

    expect(anime.currentEpisode).toBeUndefined();
    expect(anime.rating).toBeUndefined();
  });
});
