import { GamesRepository } from '@/modules/games/repository/games.repository';
import { GameDocument } from '@/modules/games/schemas/game.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesFactory {
  constructor(private readonly repo: GamesRepository) {}

  async createGame(data: Partial<GameDocument> = {}): Promise<GameDocument> {
    const game = new GameModel({
      name: 'test',
      slug: 'test',
      ...data,
    });
    return game.save();
  }

  async createList(qtd: number) {}
}
