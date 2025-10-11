import { Controller, Post, Body, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/question.create.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post(':examId')
  async createQuestion(
    @Param('examId') examId: string,
    @Body() createQuestionDtos: CreateQuestionDto[],
  ) {
    return this.questionService.saveQuestions(parseInt(examId), createQuestionDtos);
  }
}