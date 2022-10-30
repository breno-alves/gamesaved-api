import {
  HttpException,
  HttpStatus,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { UsersServices } from '../users/services/users.services';
import { JwtService } from '@nestjs/jwt';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersServices,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne({ email });
    if (user && (await this.usersService.verifyPassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    if (!user) {
      throw new HttpException(
        { message: 'Unauthorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      userId: user._id,
      username: user.username,
      user: user,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
