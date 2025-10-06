import { Injectable } from '@nestjs/common';
import { ExamRepository } from './exam.repository';
import { Exam } from './exam.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateExamDto } from './dto/exam.create.dto';
import { TeacherRepository } from '../teacher/teacher.repository';

@Injectable()
export class ExamService {
    constructor(
        private readonly examRepository: ExamRepository,
        private readonly jwtService: JwtService,
        private readonly teacherRepository: TeacherRepository,
    ) {}

    async createExam(createExamDto: CreateExamDto, req: Request) {
        const exam = new Exam();
        exam.title = createExamDto.title;
        exam.description = createExamDto.description || '';
        exam.start_time = createExamDto.start_time;
        exam.end_time = createExamDto.end_time;
        exam.duration = createExamDto.duration;
      
        const token = req.cookies?.token;
        const decoded: any = this.jwtService.decode(token);
      
        const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
        if (!teacher) {
          throw new Error('Teacher not found for this user');
        }
      
        exam.teacher = teacher;
      
        const createdExam = await this.examRepository.createExam(exam);
        return createdExam;
      }      
}
