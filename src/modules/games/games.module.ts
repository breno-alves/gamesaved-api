import { Module } from '@nestjs/common';
import { GamesService } from './services/games.service';
import { GamesController } from './controllers/games.controller';
import { GamesRepository } from './repository/games.repository';
import { Game, GameSchema } from './schemas/game.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { UserGamesController } from './controllers/user-games.controller';
import { UserGamesServices } from './services/user-games.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    UsersModule,
  ],
  providers: [GamesService, UserGamesServices, GamesRepository],
  controllers: [GamesController, UserGamesController],
  exports: [GamesService, UserGamesServices],
})
export class GamesModule {}
