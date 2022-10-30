import { CreateUserDto } from '@/modules/users/dtos/create-user-dto';
import { UsersServices } from '@/modules/users/services/users.services';
import { Injectable } from '@nestjs/common';
import * as Chance from 'chance';

@Injectable()
export class UsersFactory {
  constructor(private readonly service: UsersServices) {}

  async create(data: CreateUserDto) {
    return this.service.create(data);
  }

  async createList(qtd: number) {
    const users = [];
    const chance = new Chance();

    for await (const _ of Array(qtd)) {
      const user = await this.create({
        username: chance.hash(),
        email: chance.email(),
        password: 'password123',
        lastName: chance.name(),
        firstName: chance.name(),
        gender: 'male',
        birthDate: new Date().toString(),
        phone: chance.phone(),
        psnId: chance.string(),
        xboxGamertag: chance.string(),
        nintendoAccount: chance.string(),
        steamProfile: chance.string(),
      });

      users.push(user);
    }

    return users;
  }
}
