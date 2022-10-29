import UserPipe, { UserPipeOutput } from '@/shared/pipes/user/user.pipe';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserGamesDto } from '../dtos/create-user-games.dto';
import { UserGamesServices } from '../services/user-games.service';

@Controller('user-games')
export class UserGamesController {
  constructor(private readonly userGamesServices: UserGamesServices) {}

  @Post()
  create(
    @Param(UserPipe) { user }: UserPipeOutput,
    @Body() dto: CreateUserGamesDto,
  ) {
    return this.userGamesServices.create(dto, user);
  }

  @Get()
  list(@Param(UserPipe) { user }: UserPipeOutput) {
    return user.games;
  }

  @Delete(':id')
  delete(@Param(UserPipe) { user }: UserPipeOutput, @Param('id') id: string) {
    return this.userGamesServices.delete(id, user);
  }
}
