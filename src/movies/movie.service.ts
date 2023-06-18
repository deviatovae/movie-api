import { Movie } from './movie.entity';
import { Injectable } from '@nestjs/common';
import { AddMovieDto } from './add-movie.dto';
import { UpdateMovieDto } from './update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: MongoRepository<Movie>,
  ) {}

  getMovies(): Promise<Movie[]> {
    return this.repository.find();
  }

  getMovie(id: string): Promise<Movie | null> {
    return this.repository.findOneBy({ _id: new ObjectId(id) });
  }

  async deleteMovie(id: string): Promise<boolean> {
    return this.repository
      .deleteOne({ _id: new ObjectId(id) })
      .then((res) => res.deletedCount > 0);
  }

  addMovie(dto: AddMovieDto): Promise<Movie> {
    return this.repository.save(dto);
  }

  async updateMovie(id, dto: UpdateMovieDto): Promise<Movie | null> {
    return this.getMovie(id)
      .then((movie) => Object.assign(movie, dto))
      .then((movie) => this.repository.save(movie));
  }
}
