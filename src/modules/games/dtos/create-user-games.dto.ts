import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserGamesDto {
  @IsString()
  @IsNotEmpty()
  slug: string;
}
