import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { QuestionType } from '../question.entity';

export class CreateQuestionDto {
  @IsNotEmpty()
  @ApiProperty()
  question_text: string;

  @IsEnum(QuestionType)
  @ApiProperty({ enum: QuestionType })
  type: QuestionType;

  @IsOptional()
  @ApiProperty({ type: [String], required: false })
  options?: string[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  score: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  correct_answer?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  exam_id: number;
}
