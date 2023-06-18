import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AddMovieDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  @IsString()
  @MinLength(1)
  readonly description: string | null;
}
