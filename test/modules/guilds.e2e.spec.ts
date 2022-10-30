import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { rootMongooseTestModule } from '../utils/db.handler';
import { GuildsModule } from '@/modules/guilds/guilds.module';
import { UsersFactory } from '../../test/mocks/users.factory';
import { UsersModule } from '@/modules/users/users.module';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { AuthModule } from '@/modules/auth/auth.module';
import { AuthService } from '@/modules/auth/auth.service';
import { UserDocument } from '@/modules/users/schemas/user.schema';
import { GuildsFactory } from '../../test/mocks/guilds.factory';

describe('Guilds Controllers (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let usersFactory: UsersFactory;
  let guildsFactory: GuildsFactory;

  async function login(): Promise<[UserDocument, { access_token: string }]> {
    const [user] = await usersFactory.createList(1);
    const token = await authService.login(
      await authService.validateUser(user.email, 'password123'),
    );
    return [user, token];
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        { module: UsersModule, exports: [UsersRepository] },
        GuildsModule,
        AuthModule,
      ],
      providers: [UsersFactory, GuildsFactory],
    }).compile();

    app = module.createNestApplication();
    authService = module.get<AuthService>(AuthService);
    usersFactory = module.get<UsersFactory>(UsersFactory);
    guildsFactory = module.get<GuildsFactory>(GuildsFactory);

    await app.init();
  });

  it('should receive app defined', () => {
    expect(app).toBeDefined();
  });

  describe('/ (POST)', () => {
    it('should create a guild', async () => {
      const [user, token] = await login();
      const res = await request(app.getHttpServer())
        .post('/guilds')
        .set('Authorization', `Bearer ${token.access_token}`)
        .send({
          name: 'Guild name',
          bannerRef: 'bannerRef',
          description: 'description',
        })
        .expect(201);

      expect(res.body).toHaveProperty('name', 'Guild name');
      expect(res.body).toHaveProperty('bannerRef', 'bannerRef');
      expect(res.body).toHaveProperty('description', 'description');
      expect(res.body).toHaveProperty('owner', user._id.toString());
    });

    it('should not create a guild with an existing name', async () => {
      const [_, token] = await login();
      await request(app.getHttpServer())
        .post('/guilds')
        .set('Authorization', `Bearer ${token.access_token}`)
        .send({
          name: 'Guild name',
          bannerRef: 'bannerRef',
          description: 'description',
        })
        .expect(201);

      return request(app.getHttpServer())
        .post('/guilds')
        .set('Authorization', `Bearer ${token.access_token}`)
        .send({
          name: 'Guild name',
          bannerRef: 'bannerRef',
          description: 'description',
        })
        .expect(400);
    });

    it('should not create a guild without a name', async () => {
      const [_, token] = await login();
      return request(app.getHttpServer())
        .post('/guilds')
        .set('Authorization', `Bearer ${token.access_token}`)
        .send({
          bannerRef: 'bannerRef',
          description: 'description',
        })
        .expect(400);
    });
  });

  describe('/ (GET)', () => {
    it('should get all guilds', async () => {
      const [_, token] = await login();
      await guildsFactory.createGuildList(5, null);

      const res = await request(app.getHttpServer())
        .get('/guilds')
        .set('Authorization', `Bearer ${token.access_token}`)
        .expect(200);
      console.log(res.body);
      expect(res.body).toHaveLength(5);
    });

    it('should get all guilds paginated', async () => {
      const [_, token] = await login();
      await guildsFactory.createGuildList(100, null);

      const res = await request(app.getHttpServer())
        .get('/guilds')
        .set('Authorization', `Bearer ${token.access_token}`)
        .expect(200);
      expect(res.body).toHaveLength(25);
    });

    it('should get all guilds on seconds page of pagination', async () => {
      const [_, token] = await login();
      await guildsFactory.createGuildList(26, null);

      const res = await request(app.getHttpServer())
        .get('/guilds?page=2')
        .set('Authorization', `Bearer ${token.access_token}`)
        .expect(200);

      expect(res.body).toHaveLength(1);
    });

    it('should get all guild from a specific user', async () => {});

    it('should get all guilds witch a specific name', async () => {});
  });

  describe('/ (DELETE)', () => {});

  describe('/:id (PATCH)', () => {});
});
