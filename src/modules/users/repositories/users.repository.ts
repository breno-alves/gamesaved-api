import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '@/shared/implementations/repository';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersRepository extends GenericRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    protected readonly model: Model<UserDocument>,
  ) {
    super(model);
  }

  async create(dto: Partial<UserDocument>) {
    const userExists = await this.model
      .findOne({
        $or: [{ username: dto.username }, { email: dto.email }],
      })
      .exec();

    if (userExists) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new this.model(dto);
    return user.save();
  }
}
