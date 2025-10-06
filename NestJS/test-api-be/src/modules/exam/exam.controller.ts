import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/exam.create.dto';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Req } from '@nestjs/common';

@Controller('exam')
export class ExamController {
    constructor(private readonly examService: ExamService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createExam(@Body() createExamDto: CreateExamDto, @Req() req: Request) {
      return await this.examService.createExam(createExamDto, req);
    }   
}
