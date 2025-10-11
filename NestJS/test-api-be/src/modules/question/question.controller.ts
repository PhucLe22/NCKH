import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/question.create.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('/exam/update/:examId')
  async createQuestion(
    @Param('examId') examId: string,
    @Body() createQuestionDtos: CreateQuestionDto[],
  ) {
    return this.questionService.saveQuestions(parseInt(examId), createQuestionDtos);
  }

  @Get(':examId')
  async getQuestionsByExamId(@Param('examId') examId: string) {
    return this.questionService.findQuestionByExamId(parseInt(examId));
  }

  @Delete('/delete/:examId')
  async deleteQuestionByExamId(@Param('examId') examId: string) {
    return this.questionService.deleteQuestionByExamId(parseInt(examId));
  }

  @Get()
  async findAllQuestions() {
    return this.questionService.findAllQuestions();
  }
}