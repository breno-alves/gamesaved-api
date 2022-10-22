import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { rootMongooseTestModule } from '../utils/db.handler';
import { UsersModule } from '../../src/modules/users/users.module';

describe('Users Controllers (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should receive app defined', () => {
    expect(app).toBeDefined();
  });

  describe('/ (POST)', () => {
    it('should create a new user', async () => {
      const res = await request(app.getHttpServer())
        .post('/users')
        .send({
          username: 'user1',
          email: 'user1@gamesaved.com',
          password: '123456',
          firstName: 'User',
          lastName: 'One',
          birthDate: '1990-01-01',
          gender: 'male',
          phone: '1234567890',
        })
        .expect(201);

      expect(res.body).toHaveProperty('username', 'user1');
      expect(res.body).toHaveProperty('email', 'user1@gamesaved.com');
      expect(res.body).toHaveProperty('firstName', 'User');
      expect(res.body).toHaveProperty('lastName', 'One');
      expect(res.body).toHaveProperty('birthDate', '1990-01-01');
      expect(res.body).toHaveProperty('gender', 'male');
      expect(res.body).toHaveProperty('phone', '1234567890');
    });

    it('should not create a new user with an existing username', async () => {
      const userData = {
        username: 'user1',
        email: 'user1@gamesaved.com',
        password: '123456',
        firstName: 'User',
        lastName: 'One',
        birthDate: '1990-01-01',
        gender: 'male',
        phone: '1234567890',
      };

      await request(app.getHttpServer())
        .post('/users')
        .send(userData)
        .expect(201);

      return request(app.getHttpServer())
        .post('/users')
        .send(userData)
        .expect(400);
    });
  });
});
