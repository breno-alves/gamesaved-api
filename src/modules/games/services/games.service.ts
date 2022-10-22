import { GenericService } from '@/shared/implementations/service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GamesRepository } from '../repository/games.repository';
import { GameDocument } from '../schemas/game.schema';

@Injectable()
export class GamesService extends GenericService<GameDocument> {
  constructor(protected readonly repo: GamesRepository) {
    super(repo);
  }

  async create(data: Partial<GameDocument>) {
    const exists = await this.repo.findOne({ slug: data.slug });

    if (exists) {
      throw new HttpException(
        { message: 'game already exists' },
        HttpStatus.CONFLICT,
      );
    }
    return this.repo.create(data);
  }
}
