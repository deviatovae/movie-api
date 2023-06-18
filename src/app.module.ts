import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';
import { MovieService } from './movies/movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies/movie.entity';
import typeormConfig from './typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeormConfig),
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService, MovieService],
})
export class AppModule {}
