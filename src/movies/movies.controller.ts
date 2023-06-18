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
import { AddMovieDto } from './add-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies() {
    return this.movieService.getMovies();
  }

  @Get(':id')
  async getMovie(@Param('id') id: string) {
    const movie = await this.movieService.getMovie(id);
    if (!movie) {
      throw new NotFoundException();
    }
    return movie;
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    if (!(await this.movieService.deleteMovie(id))) {
      throw new NotFoundException();
    }
  }

  @Post()
  addMovie(@Body() dto: AddMovieDto) {
    return this.movieService.addMovie(dto);
  }

  @Put(':id')
  async updateMovie(@Param('id') id: string, @Body() dto: AddMovieDto) {
    const movie = await this.movieService.updateMovie(id, dto);
    if (!movie) {
      throw new NotFoundException();
    }
    return movie;
  }
}
