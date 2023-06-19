import { Movie } from './movie.entity';
import { Injectable } from '@nestjs/common';
import { AddMovieDto, UpdateMovieDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { RateMovieDto } from './dto/rate-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: MongoRepository<Movie>,
  ) {}

  getMovies(): Promise<Movie[]> {
    return this.repository
      .aggregate([
        {
          $addFields: {
            ratingValue: {
              $cond: [
                { $eq: ['$ratingCount', 0] },
                0,
                { $divide: ['$rating', '$ratingCount'] },
              ],
            },
          },
        },
        { $sort: { ratingValue: -1 } },
      ])
      .toArray()
      .then((values) =>
        values.map((value) =>
          this.repository.create({ ...value, id: value['_id'] }),
        ),
      );
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

  async rateMovie(id, { rating }: RateMovieDto): Promise<Movie | null> {
    const movie = await this.getMovie(id);
    if (!movie) {
      return null;
    }

    this.repository.updateOne({ _id: new ObjectId(id) }, [
      {
        $set: {
          rating: { $sum: ['$rating', rating] },
          ratingCount: { $sum: ['$ratingCount', 1] },
        },
      },
    ]);

    movie.rating += rating;
    movie.ratingCount += 1;

    return movie;
  }
}
