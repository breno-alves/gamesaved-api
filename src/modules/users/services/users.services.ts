import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { FilterQuery } from 'mongoose';
import { CreateUserDto } from '../repositories/dtos/create-user.dto';

@Injectable()
export class UsersServices {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto) {
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
    dto: Partial<User>,
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
}
