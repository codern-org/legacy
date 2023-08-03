import { QuestionLevel } from '@codern/internal';
import { Expose, Transform } from 'class-transformer';
import {
  IsDefined, IsEnum, IsInt, IsString,
} from 'class-validator';

export class CreateQuestionDto {

  @IsString()
  @IsDefined()
  @Expose({ name: 'question-name' })
  name!: string;

  @IsString()
  @IsDefined()
  @Expose({ name: 'question-description' })
  description!: string;

  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt()
  @IsDefined()
  @Expose({ name: 'question-memory-limit' })
  memoryLimit!: number;

  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt({ message: 'invalid request header `question-time-limit`' })
  @IsDefined()
  @Expose({ name: 'question-time-limit' })
  timeLimit!: number;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(QuestionLevel)
  @IsDefined()
  @Expose({ name: 'question-level' })
  level!: QuestionLevel;

  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt()
  @IsDefined()
  @Expose({ name: 'question-score' })
  score!: number;

}
