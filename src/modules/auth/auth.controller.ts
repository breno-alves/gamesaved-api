import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, Public } from '@/modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(
      body?.email,
      body?.password,
    );

    return this.authService.login(user);
  }
}
