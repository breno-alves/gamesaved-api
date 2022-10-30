import { UserDocument } from '@/modules/users/schemas/user.schema';
import { UsersServices } from '@/modules/users/services/users.services';
import { PaginatorDto } from '@/shared/pipes/paginator/dtos/paginator.dto';
import { SchemaId } from '@/shared/types/schema-id.type';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { CreateGuildDto } from '../dtos/create-guild.dto';
import { GuildsRepository } from '../repositories/guilds.repository';
import { Guild } from '../schemas/guild.schema';

@Injectable()
export class GuildsService {
  constructor(
    private readonly guildsRepo: GuildsRepository,
    private readonly usersService: UsersServices,
  ) {}

  create(dto: CreateGuildDto, user: UserDocument) {
    const dtoWithOwner = { ...dto, owner: user._id };

    if (!this.validateGuildCreation(dtoWithOwner)) {
      throw new HttpException(
        { message: 'invalid guild creation' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.guildsRepo.create(dtoWithOwner);
  }

  findAll(
    where: FilterQuery<Guild>,
    options = <PaginatorDto>{ limit: 25, page: 0 },
  ) {
    const queryOptions = <QueryOptions>{
      limit: options.limit,
      skip: options.limit * options.page,
    };
    return this.guildsRepo.find(where, queryOptions);
  }

  update(where: FilterQuery<Guild>, dto: Partial<Guild>) {
    const updateQuery = <UpdateQuery<Guild>>{
      ...dto,
    };

    if (updateQuery.members) {
      updateQuery.members = {
        $each: { $push: updateQuery.members },
      };
    }

    if (updateQuery.admins) {
      updateQuery.members = {
        $each: { $push: updateQuery.admins },
      };
    }

    return this.guildsRepo.update(where, dto);
  }

  delete(where: FilterQuery<Guild>) {
    return this.guildsRepo.delete(where);
  }

  private async validateGuildCreation(
    dto: CreateGuildDto & { owner: SchemaId },
  ) {
    let validationFlag = true;

    const validateOwner = this.usersService.findOne({ _id: dto.owner });
    const validateAdmins =
      dto.admins?.map(async (_id) => this.usersService.findOne({ _id })) || [];
    const validateGuildMembers =
      dto.members?.map(async (_id) => this.usersService.findOne({ _id })) || [];

    const promises = [
      validateOwner,
      ...validateAdmins,
      ...validateGuildMembers,
    ];
    await Promise.all(promises);

    promises.forEach((promise) => {
      if (!promise) validationFlag = false;
    });

    return validationFlag;
  }
}
