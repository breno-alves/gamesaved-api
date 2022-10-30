import { PaginatorDto } from '@/shared/pipes/paginator/dtos/paginator.dto';
import PaginatorPipe from '@/shared/pipes/paginator/paginator.pipe';
import UserPipe, { UserPipeOutput } from '@/shared/pipes/user/user.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGuildDto } from '../dtos/create-guild.dto';
import { Guild } from '../schemas/guild.schema';
import { GuildsService } from '../services/guilds.service';

@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Param(UserPipe) { user }: UserPipeOutput,
    @Body() dto: CreateGuildDto,
  ) {
    return this.guildsService.create(dto, user);
  }

  @Get()
  findAll(@Query(PaginatorPipe) paginator: PaginatorDto) {
    return this.guildsService.findAll({}, paginator);
  }

  @Patch(':id')
  update(
    @Param(UserPipe) { user }: UserPipeOutput,
    @Param('id') id: string,
    @Body() dto: Partial<Guild>,
  ) {
    return this.guildsService.update({ _id: id, owner: user._id }, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Param(UserPipe) { user }: UserPipeOutput) {
    return this.guildsService.delete({ _id: id, owner: user._id });
  }
}
