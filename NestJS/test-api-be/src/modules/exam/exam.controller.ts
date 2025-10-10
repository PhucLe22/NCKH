import { Controller, Post, Patch, Delete, Body, Param, Get } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/exam.create.dto';
import { UpdateExamDto } from './dto/exam.update.dto';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Req } from '@nestjs/common';
import { VerifyExamCodeDto } from './dto/exam.verify.dto';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createExam(@Body() createExamDto: CreateExamDto, @Req() req: Request) {
    return await this.examService.createExam(createExamDto, req);
  }

  @Get('')
  async findExams(
    @Req() req: Request) {
    return await this.examService.findAll();
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

  @UseGuards(JwtAuthGuard)
  @Post('/:id/verify-code')
  async verifyExamCode(
    @Param('id') id: number,
    @Body() verifyExamCodeDto: VerifyExamCodeDto) {
    return await this.examService.verifyExamCode(id, verifyExamCodeDto);
  } 

  @UseGuards(JwtAuthGuard)
  @Get('/teacher/me')
  async findExamsByTeacher(
    @Req() req: Request) {
    return await this.examService.findExamsByTeacher(req);
  }
}
