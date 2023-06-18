import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class RateMovieDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  readonly rating: number;
}
