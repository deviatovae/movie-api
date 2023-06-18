import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { AddMovieDto, UpdateMovieDto } from './dto';
import { RateMovieDto } from './dto/rate-movie.dto';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies() {
    return this.movieService
      .getMovies()
      .then((movies) => movies.map((movie) => MovieDto.createFromMovie(movie)));
  }

  @Get(':id')
  async getMovie(@Param('id') id: string) {
    const movie = await this.movieService.getMovie(id);
    if (!movie) {
      throw new NotFoundException();
    }
    return MovieDto.createFromMovie(movie);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    if (!(await this.movieService.deleteMovie(id))) {
      throw new NotFoundException();
    }
  }

  @Post()
  addMovie(@Body() dto: AddMovieDto) {
    return this.movieService
      .addMovie(dto)
      .then((movie) => MovieDto.createFromMovie(movie));
  }

  @Put(':id')
  async updateMovie(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    const movie = await this.movieService.updateMovie(id, dto);
    if (!movie) {
      throw new NotFoundException();
    }
    return MovieDto.createFromMovie(movie);
  }

  @Post(':id/rate')
  async rateMovie(@Param('id') id: string, @Body() dto: RateMovieDto) {
    const movie = await this.movieService.rateMovie(id, dto);
    if (!movie) {
      throw new NotFoundException();
    }
    return MovieDto.createFromMovie(movie);
  }
}
