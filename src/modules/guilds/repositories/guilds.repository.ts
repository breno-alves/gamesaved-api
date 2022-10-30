import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '@/shared/implementations/repository';
import { Guild, GuildDocument } from '../schemas/guild.schema';

@Injectable()
export class GuildsRepository extends GenericRepository<GuildDocument> {
  constructor(
    @InjectModel(Guild.name)
    protected readonly model: Model<GuildDocument>,
  ) {
    super(model);
  }

  async create(dto: Partial<GuildDocument>) {
    const guildExists = await this.model.findOne({ name: dto.name });

    if (guildExists) {
      throw new HttpException({ message: 'guild already exists' }, 400);
    }

    const guild = new this.model(dto);
    return guild.save();
  }
}
