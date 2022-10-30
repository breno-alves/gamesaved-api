import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersServices } from '../services/users.services';
import UserPipe, { UserPipeOutput } from '@/shared/pipes/user/user.pipe';

@Controller('follow')
export class FollowController {
  constructor(private usersServices: UsersServices) {}

  @Get(':id')
  async findFromUser(@Param('id') id: string) {
    const user = await this.usersServices.findOne({ _id: id });
    return { following: user.following, followers: user.followers };
  }
  @Post(':id')
  create(@Param('id') id: string, @Param(UserPipe) { user }: UserPipeOutput) {
    return this.usersServices.followUser(id, user._id);
  }

  @Delete()
  delete(@Param('id') id: string, @Param(UserPipe) { user }: UserPipeOutput) {
    return this.usersServices.unfollowUser(id, user._id);
  }
}
