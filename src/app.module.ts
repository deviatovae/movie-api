import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';
import { MovieRepository } from './movies/movie.repository';

@Module({
  imports: [],
  controllers: [AppController, MoviesController],
  providers: [AppService, MovieRepository],
})
export class AppModule {}
