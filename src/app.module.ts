import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';
import { MovieService } from './movies/movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies/movie.entity';
import typeormConfig from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { UserService } from './users/user.service';
import { UsersController } from './users/users.controller';
import { Password } from './auth/password.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeormConfig),
    TypeOrmModule.forFeature([Movie, User]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [
    AppController,
    MoviesController,
    UsersController,
    AuthController,
  ],
  providers: [AppService, MovieService, UserService, Password, AuthService],
})
export class AppModule {}
