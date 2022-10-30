import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { GuildMembersController } from './controllers/guild-members.controller';
import { GuildsController } from './controllers/guilds.controller';
import { GuildsRepository } from './repositories/guilds.repository';
import { Guild, GuildSchema } from './schemas/guild.schema';
import { GuildsService } from './services/guilds.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }]),
    UsersModule,
  ],
  controllers: [GuildsController, GuildMembersController],
  providers: [GuildsService, GuildsRepository],
  exports: [GuildsService],
})
export class GuildsModule {}
