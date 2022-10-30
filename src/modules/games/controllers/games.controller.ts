import { Public } from '@/modules/auth/auth.service';
import { PaginatorDto } from '@/shared/pipes/paginator/dtos/paginator.dto';
import PaginatorPipe from '@/shared/pipes/paginator/paginator.pipe';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGameDto } from '../dtos/create-game.dto';
import { GamesService } from '../services/games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() dto: CreateGameDto) {
    return this.gamesService.create(dto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  find(@Query(PaginatorPipe) paginator: PaginatorDto) {
    return this.gamesService.find({}, paginator);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // TODO: review id
    // @ts-ignore
    return this.gamesService.findOne({ _id: id });
  }
}
