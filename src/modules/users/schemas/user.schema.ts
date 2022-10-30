import { Game, GameDocument } from '@/modules/games/schemas/game.schema';
import { GuildDocument } from '@/modules/guilds/schemas/guild.schema';
import { SchemaId } from '@/shared/types/schema-id.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type Gender = 'male' | 'female' | 'other';

@Schema({ timestamps: true, collection: 'gs__users' })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  gender: Gender;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: '' })
  avatarRef: string;

  @Prop({ default: '' })
  psnId: string;

  @Prop({ default: '' })
  xboxGamertag: string;

  @Prop({ default: '' })
  nintendoAccount: string;

  @Prop({ default: '' })
  steamProfile: string;

  @Prop({ type: SchemaTypes.Array, default: [] })
  games: SchemaId[] | GameDocument[];

  @Prop({ type: SchemaTypes.Array, default: [] })
  guilds: SchemaId[] | GuildDocument[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
