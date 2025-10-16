import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class StudentAttendExamDto {
  @IsNotEmpty()
  @IsNumber()
  examId: number;

  @IsOptional()
  @IsString()
  examCode?: string;
}