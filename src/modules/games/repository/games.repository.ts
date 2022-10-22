import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '../schemas/game.schema';
import { CreateGameDto } from './dtos/create-game.dto';

@Injectable()
export class GamesRepository {
  constructor(@InjectModel(Game.name) private readonly model: Model<Game>) {}

  create(dto: CreateGameDto) {
    return this.model.create();
  }

  find() {}

  findOne() {}

  delete() {}

  update() {}
}
