import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '@/shared/implementations/repository';
import { Game, GameDocument } from '../schemas/game.schema';

@Injectable()
export class GamesRepository extends GenericRepository<GameDocument> {
  constructor(
    @InjectModel(Game.name)
    protected readonly model: Model<GameDocument>,
  ) {
    super(model);
  }
}
