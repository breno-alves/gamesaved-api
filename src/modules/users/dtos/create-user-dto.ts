import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Gender } from '../schemas/user.schema';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  avatarRef?: string;

  @IsString()
  @IsOptional()
  psnId?: string;

  @IsString()
  @IsOptional()
  xboxGamertag?: string;

  @IsString()
  @IsOptional()
  nintendoAccount?: string;

  @IsString()
  @IsOptional()
  steamProfile?: string;
}
