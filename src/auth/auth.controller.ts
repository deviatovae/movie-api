import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { IsPublic } from './is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authorize: AuthService) {}

  @IsPublic()
  @Post()
  async auth(@Body() dto: AuthDto) {
    const token = await this.authorize.auth(dto);
    if (!token) {
      throw new UnauthorizedException();
    }
    return { token };
  }
}
