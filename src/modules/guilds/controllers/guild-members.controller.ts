import { PaginatorDto } from '@/shared/pipes/paginator/dtos/paginator.dto';
import PaginatorPipe from '@/shared/pipes/paginator/paginator.pipe';
import UserPipe, { UserPipeOutput } from '@/shared/pipes/user/user.pipe';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GuildsService } from '../services/guilds.service';

@Controller('guild-members')
export class GuildMembersController {
  constructor(private readonly guildsService: GuildsService) {}

  @Post(':id/members')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Param(UserPipe) { user }: UserPipeOutput, @Param('id') id: string) {
    return this.guildsService.update({ _id: id }, { members: [user._id] });
  }

  @Get(':id/members')
  findAll(
    @Param(UserPipe) { user }: UserPipeOutput,
    @Query(PaginatorPipe) paginator: PaginatorDto,
  ) {
    return this.guildsService.findAll(
      {
        $or: [{ owner: user._id }, { members: { $in: [user._id] } }],
      },
      paginator,
    );
  }

  @Delete(':id/member/:memberId')
  delete(@Param(UserPipe) { user }: UserPipeOutput) {
    return this.guildsService.delete({
      $or: [{ owner: user._id }, { admins: { $in: [user._id] } }],
    });
  }
}
