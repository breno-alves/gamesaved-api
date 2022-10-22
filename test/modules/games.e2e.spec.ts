import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { rootMongooseTestModule } from '../utils/db.handler';
import { GamesModule } from '@/modules/games/games.module';
import { GamesRepository } from '@/modules/games/repository/games.repository';

describe('Games Controllers (e2e)', () => {
  let app: INestApplication;
  let repo: GamesRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), GamesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    repo = moduleFixture.get(GamesRepository);
    await app.init();
  });

  it('should receive app defined', () => {
    expect(app).toBeDefined();
  });

  describe('/ (POST)', () => {
    it('should create a new game', async () => {
      const res = await request(app.getHttpServer())
        .post('/games')
        .send({
          slug: 'metal-slug-3',
          name: 'Metal Slug 3',
          description:
            'Metal Slug 3 is a run and gun video game developed by SNK and released in 1999 for the Neo Geo MVS arcade platform and in 2000 for the Neo Geo AES home console.',
          metacritic: 90,
          metacritic_url: 'https://www.metacritic.com/game/arcade/metal-slug-3',
          released: '1999-12-01',
          background_image: 'test',
        })
        .expect(201);

      expect(res.body).toHaveProperty('slug', 'metal-slug-3');
      expect(res.body).toHaveProperty('name', 'Metal Slug 3');
      expect(res.body).toHaveProperty(
        'description',
        'Metal Slug 3 is a run and gun video game developed by SNK and released in 1999 for the Neo Geo MVS arcade platform and in 2000 for the Neo Geo AES home console.',
      );
      expect(res.body).toHaveProperty('metacritic', 90);
      expect(res.body).toHaveProperty(
        'metacritic_url',
        'https://www.metacritic.com/game/arcade/metal-slug-3',
      );
      expect(res.body).toHaveProperty('released', '1999-12-01');
      expect(res.body).toHaveProperty('background_image', 'test');
    });

    it('should not create a new game with an existing slug', async () => {
      const gameData = {
        slug: 'metal-slug-3',
        name: 'Metal Slug 3',
        description:
          'Metal Slug 3 is a run and gun video game developed by SNK and released in 1999 for the Neo Geo MVS arcade platform and in 2000 for the Neo Geo AES home console.',
        metacritic: 90,
        metacritic_url: 'https://www.metacritic.com/game/arcade/metal-slug-3',
        released: '1999-12-01',
        background_image: 'test',
      };

      await request(app.getHttpServer())
        .post('/games')
        .send(gameData)
        .expect(201);

      return request(app.getHttpServer())
        .post('/games')
        .send(gameData)
        .expect(409);
    });
  });

  describe.skip('/ (GET)', () => {});
});
