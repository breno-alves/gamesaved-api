import { Module } from '@nestjs/common';
import { GamesService } from './services/games.service';
import { GamesController } from './controllers/games.controller';
import { GamesRepository } from './repository/games.repository';
import { Game, GameSchema } from './schemas/game.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  providers: [GamesService, GamesRepository],
  controllers: [GamesController],
  exports: [GamesService],
})
export class GamesModule {}
