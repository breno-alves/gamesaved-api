import { CreateUserDto } from '@/modules/users/dtos/create-user-dto';
import { UsersServices } from '@/modules/users/services/users.services';
import { Injectable } from '@nestjs/common';
import * as Chance from 'chance';
import { GuildsService } from '@/modules/guilds/services/guilds.service';
import { CreateGuildDto } from '@/modules/guilds/dtos/create-guild.dto';
import { User, UserDocument } from '@/modules/users/schemas/user.schema';
import { Guild } from '@/modules/guilds/schemas/guild.schema';

@Injectable()
export class GuildsFactory {
  constructor(
    private readonly guildsServices: GuildsService,
    private readonly usersService: UsersServices,
  ) {}

  async createUser(data: CreateUserDto) {
    return this.usersService.create(data);
  }

  async createGuild(data: CreateGuildDto, user: UserDocument) {
    return this.guildsServices.create(data, user);
  }

  async createGuildList(
    qtd: number,
    user: UserDocument,
  ): Promise<[Guild, User][]> {
    const guilds = [];
    const chance = new Chance();

    for await (const _ of Array(qtd)) {
      if (!user) {
        user = await this.createUser({
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
      }

      const guild = await this.createGuild(
        {
          name: chance.hash(),
          description: chance.hash(),
          bannerRef: chance.hash(),
          warCry: chance.hash(),
        },
        user,
      );

      guilds.push([guild, user]);
    }

    return guilds;
  }
}
