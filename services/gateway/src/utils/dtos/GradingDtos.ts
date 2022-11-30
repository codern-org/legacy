import { Language } from '@codern-api/internal';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';

export class GradeParams {

  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt()
  questionId!: number;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(Language)
  language!: Language;

}
