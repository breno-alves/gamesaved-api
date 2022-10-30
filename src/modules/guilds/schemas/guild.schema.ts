import { User, UserDocument } from '@/modules/users/schemas/user.schema';
import { SchemaId } from '@/shared/types/schema-id.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true, collection: 'gs__guilds' })
export class Guild {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: '' })
  bannerRef?: string;

  @Prop({ required: false, default: '' })
  description?: string;

  @Prop({ type: SchemaTypes.Array, default: [] })
  members?: SchemaId[] | UserDocument[];

  @Prop({ ref: User.name, type: SchemaTypes.ObjectId, required: true })
  owner: SchemaId | UserDocument;

  @Prop({ type: SchemaTypes.Array, default: [] })
  admins?: SchemaId[] | UserDocument[];

  @Prop({ required: false })
  warCry?: string;
}

export type GuildDocument = HydratedDocument<Guild>;
export const GuildSchema = SchemaFactory.createForClass(Guild);
