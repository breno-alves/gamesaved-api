import { Module } from '@nestjs/common';
import { GamesService } from './services/games.service';
import { GamesController } from './controllers/games.controller';

@Module({
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
