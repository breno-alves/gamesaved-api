import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { SchemaId } from '@/shared/types/schema-id.type';

@Injectable()
export class UsersServices {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: Partial<UserDocument>) {
    const hashedPassword = await this.hashPassword(dto.password);

    return this.usersRepository.create({ ...dto, password: hashedPassword });
  }

  findOne(
    where: FilterQuery<Pick<UserDocument, 'username' | 'email' | '_id'>>,
  ) {
    return this.usersRepository.findOne(where);
  }

  find(where: FilterQuery<Pick<UserDocument, 'username' | 'email' | '_id'>>) {
    return this.usersRepository.find(where);
  }

  update(
    where: FilterQuery<Pick<UserDocument, 'username' | 'email' | '_id'>>,
    dto: UpdateQuery<User>,
  ) {
    return this.usersRepository.update(where, dto);
  }

  delete(where: FilterQuery<Pick<UserDocument, 'username' | 'email' | '_id'>>) {
    return this.usersRepository.delete(where);
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async followUser(target: string | SchemaId, user: string | SchemaId) {
    const alreadyFollows = await this.findOne({
      $or: [
        { _id: target, followers: { $in: user } },
        {
          _id: user,
          following: { $in: target },
        },
      ],
    });

    if (alreadyFollows) {
      throw new HttpException(
        { message: 'user already followed' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.update({ _id: target }, { $push: { followers: user } });
    return this.update({ _id: user }, { $push: { following: target } });
  }

  async unfollowUser(target: string | SchemaId, user: string | SchemaId) {
    const alreadyFollows = await this.findOne({
      $or: [
        { _id: target, followers: { $in: user } },
        {
          _id: user,
          following: { $in: target },
        },
      ],
    });

    if (!alreadyFollows) {
      throw new HttpException(
        { message: 'user not followed' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.update({ _id: target }, { $pull: { followers: user } });
    return this.update({ _id: user }, { $pull: { following: target } });
  }
}
