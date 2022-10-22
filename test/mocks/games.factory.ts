import { GamesRepository } from '@/modules/games/repository/games.repository';
import { GameDocument } from '@/modules/games/schemas/game.schema';

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
