import { User } from '@/modules/users/schemas/user.schema';
import { UsersServices } from '@/modules/users/services/users.services';
import { SchemaId } from '@/shared/types/schema-id.type';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GamesRepository } from '../repository/games.repository';
import { Game } from '../schemas/game.schema';

@Injectable()
export class UserGamesServices {
  constructor(
    private readonly usersService: UsersServices,
    private readonly gamesRepo: GamesRepository,
  ) {}

  async create(data: Pick<Game, 'slug'>, user: User) {
    const exists = await this.gamesRepo.findOne({ slug: data.slug });
    const userGames = <SchemaId[]>user.games || [];

    if (!exists) {
      throw new HttpException(
        { message: 'game doesnt exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userGames.find((gameId) => gameId === exists._id)) {
      throw new HttpException(
        { message: 'game already added to users games' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.usersService.update(
      { email: user.email },
      { $push: { games: exists._id } },
    );
  }

  async delete(id: string, user: User) {
    const userGames = <SchemaId[]>user.games || [];

    if (!userGames.find((gameId) => gameId.toString() === id)) {
      throw new HttpException(
        { message: 'game not found in users games' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.usersService.update(
      { email: user.email },
      { $pull: { games: id } },
    );
  }
}
