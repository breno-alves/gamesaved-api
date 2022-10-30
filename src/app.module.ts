import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/config';
import { AuthService } from './modules/auth/auth.service';
import { GamesModule } from './modules/games/games.module';
import { GuildsModule } from './modules/guilds/guilds.module';

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
    GuildsModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
