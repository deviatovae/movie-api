import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';
import { MovieService } from './movies/movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies/movie.entity';
import typeormConfig from './typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { UserService } from './users/user.service';
import { UsersController } from './users/users.controller';
import { Password } from './infrastructure/password.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeormConfig),
    TypeOrmModule.forFeature([Movie, User]),
  ],
  controllers: [AppController, MoviesController, UsersController],
  providers: [AppService, MovieService, UserService, Password],
})
export class AppModule {}
