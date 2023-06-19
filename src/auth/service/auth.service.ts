import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { AuthDto } from '../dto/auth.dto';
import { TokenPayload } from '../types/token-payload';
import { HashPasswordService } from '../../security/hash-password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private password: HashPasswordService,
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
    const payload: TokenPayload = { userId: userId.toString() };
    return this.jwtService.signAsync(payload);
  }
}
