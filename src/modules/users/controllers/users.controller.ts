import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from '@/modules/auth/auth.service';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UsersServices } from '../services/users.services';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersServices) {}

  @Public()
  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: CreateUserDto) {
    return this.usersServices.create(body);
  }

  @Get('/')
  findAll() {
    return this.usersServices.find({});
  }

  @Get(':id')
  findOne(@Param() id: string) {
    return this.usersServices.findOne({ _id: id });
  }
}
