import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  metacritic: number;

  @IsString()
  @IsOptional()
  metacritic_url?: string;

  @IsString()
  released: string;

  @IsString()
  @IsNotEmpty()
  background_image: string;

  @IsOptional()
  @IsArray()
  platforms?: string[];

  @IsOptional()
  @IsArray()
  screenshots?: string[];
}
