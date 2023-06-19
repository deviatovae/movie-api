import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description: string | null;
}
