import { SchemaId } from '@/shared/types/schema-id.type';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateGuildDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  bannerRef?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  members?: SchemaId[];

  @IsArray()
  @IsOptional()
  admins?: SchemaId[];

  @IsString()
  @IsOptional()
  warCry?: string;
}
