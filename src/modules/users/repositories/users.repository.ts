import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async create(dto: CreateUserDto): Promise<UserDocument> {
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

  async findOne(
    where: FilterQuery<UserDocument>,
    projection = <ProjectionType<UserDocument>>{},
    options = <QueryOptions<UserDocument>>{ lean: true, skip: 0, limit: 1 },
  ): Promise<UserDocument> {
    return this.model.findOne(where, projection, options).exec();
  }

  async find(
    where: FilterQuery<UserDocument>,
    projection = <ProjectionType<UserDocument>>{},
    options = <QueryOptions<UserDocument>>{ lean: true, skip: 0, limit: 25 },
  ): Promise<UserDocument[]> {
    return this.model.find(where, projection, options).exec();
  }

  async update(where: FilterQuery<UserDocument>, dto: Partial<CreateUserDto>) {
    return this.model.updateOne(where, dto).exec();
  }

  async delete(where: FilterQuery<UserDocument>) {
    const deletedUser = await this.model.deleteOne(where).exec();

    if (!deletedUser) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return deletedUser;
  }
}
