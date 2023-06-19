import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authorize: AuthService) {}
  @Post()
  async auth(@Body() dto: AuthDto) {
    const token = await this.authorize.auth(dto);
    if (!token) {
      throw new UnauthorizedException();
    }
    return { token };
  }
}
