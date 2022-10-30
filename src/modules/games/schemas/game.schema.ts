import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'gs__games' })
export class Game {
  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  metacritic: number;

  @Prop({ required: false })
  metacritic_url?: string;

  @Prop({ required: true })
  released: string;

  @Prop({ required: true })
  background_image: string;

  @Prop({ required: false, default: [] })
  platforms?: string[];

  @Prop({ required: false, default: [] })
  screenshots?: string[];
}

export type GameDocument = HydratedDocument<Game>;
export const GameSchema = SchemaFactory.createForClass(Game);
