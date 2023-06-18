import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post, Put,
} from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { AddMovieDto } from './add-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieRepository: MovieRepository) {}

  @Get()
  getMovies() {
    return this.movieRepository.getMovies();
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    const movie = this.movieRepository.getMovie(id);
    if (!movie) {
      throw new NotFoundException();
    }
    return movie;
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    if (!this.movieRepository.deleteMovie(id)) {
      throw new NotFoundException();
    }
  }

  @Post()
  addMovie(@Body() dto: AddMovieDto) {
    return this.movieRepository.addMovie(dto);
  }

  @Put(':id')
  updateMovie(@Param('id') id: string, @Body() dto: AddMovieDto) {
    const movie = this.movieRepository.updateMovie(id, dto);
    if (!movie) {
      throw new NotFoundException();
    }
    return movie
  }
}
