import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddMovieDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description: string | null;
}
