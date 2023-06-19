import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { Password } from './password.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private password: Password,
  ) {}

  async auth({ email, password }: AuthDto): Promise<string | null> {
    const {
      id: userId,
      password: userPass,
      salt,
    } = await this.usersService.getUserByEmail(email);

    const hashedPass = await this.password.hashPassword(password, salt);
    if (userPass !== hashedPass) {
      return null;
    }
    return this.jwtService.signAsync({ userId });
  }
}
