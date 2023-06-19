import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MovieService],
})
export class MovieModule {}
