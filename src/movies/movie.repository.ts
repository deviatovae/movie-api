import { Movie } from './movie.entity';
import { Injectable } from '@nestjs/common';
import { AddMovieDto } from './add-movie.dto';
import { UpdateMovieDto } from './update-movie.dto';

@Injectable()
export class MovieRepository {
  private readonly movies: Movie[] = [
    new Movie('1', 'Lost in translation', 'LoremLoremLoremLorem'),
    new Movie('2', 'Ghost in the shell', 'LoremLoremLoremLorem'),
    new Movie('3', 'Only yesterday', 'LoremLoremLoremLorem'),
  ];
  private lastId = 4;

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovie(id: string): Movie | undefined {
    return this.movies.find(({ id: movieId }) => id === movieId);
  }

  deleteMovie(id: string): boolean {
    const movieIdx = this.movies.findIndex(({ id: movieId }) => id === movieId);
    if (movieIdx < 0) {
      return false;
    }
    this.movies.splice(movieIdx, 1);
    return true;
  }

  addMovie({ name, description }: AddMovieDto): Movie {
    const movie = new Movie((this.lastId++).toString(), name, description);
    this.movies.push(movie);

    return movie;
  }

  updateMovie(id, { name, description }: UpdateMovieDto): Movie | undefined {
    const movie = this.movies.find(({ id: movieId }) => id === movieId);
    if (!movie) {
      return null;
    }
    movie.name = name;
    movie.description = description;

    return movie;
  }
}
