import { Movie } from '../movie.entity';

export class MovieDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string | null,
    readonly rating: number,
  ) {}

  static createFromMovie({
    id,
    name,
    description,
    rating,
    ratingCount,
  }: Movie): MovieDto {
    return {
      id: id.toString(),
      name,
      description,
      rating: parseFloat((rating / ratingCount).toFixed(1)),
    };
  }
}
