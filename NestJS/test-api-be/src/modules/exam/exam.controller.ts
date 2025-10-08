import { Controller, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/exam.create.dto';
import { UpdateExamDto } from './dto/exam.update.dto';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Req } from '@nestjs/common';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createExam(@Body() createExamDto: CreateExamDto, @Req() req: Request) {
    return await this.examService.createExam(createExamDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async updateExam(
    @Param('id') id: number,
    @Body() updateExamDto: UpdateExamDto,
    @Req() req: Request,) {
    return await this.examService.updateExamById(id, updateExamDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteExam(
    @Param('id') id: number,
    @Req() req: Request) {
    return await this.examService.deleteExamById(id, req);
  }
}
