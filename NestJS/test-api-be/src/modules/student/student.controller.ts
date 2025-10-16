import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentAttendExamDto } from './dto/student.attend.exam.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RequestWithUser } from '../auth/types';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Post('join/exam')
    @UseGuards(JwtAuthGuard) 
    joinExam(@Body() joinExamDto: StudentAttendExamDto, @Req() req: RequestWithUser) {
        return this.studentService.joinExam(req, joinExamDto.examId, joinExamDto.examCode);
    }
}
