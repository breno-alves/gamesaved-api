import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/config';
import { AuthService } from './modules/auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { GamesModule } from './modules/games/games.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>('database.uri'),
      }),
    }),
    UsersModule,
    AuthModule,
    GamesModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
