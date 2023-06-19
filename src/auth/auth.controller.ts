import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './service/auth.service';
import { IsPublic } from './decorator/is-public.decorator';
import { TokenDto } from './dto/token.dto';

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

    return new TokenDto(token);
  }
}
