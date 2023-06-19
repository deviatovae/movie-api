import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config/jwt.config';
import { UserModule } from '../user/user.module';
import { HashPasswordService } from '../security/hash-password.service';
import { UserService } from '../user/user.service';
import { SecurityModule } from '../security/security.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forFeature([User]),
    UserModule,
    SecurityModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, HashPasswordService],
})
export class AuthModule {}
