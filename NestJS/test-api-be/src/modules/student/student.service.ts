import { Injectable } from '@nestjs/common';
import { StudentAttendExamDto } from './dto/student.attend.exam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from './student.repository';
import { UserRepository } from '../user/user.repository';
import { ExamRepository } from '../exam/exam.repository';
import { Student } from './student.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class StudentService {
    constructor(
    @InjectRepository(StudentRepository)
    private readonly studentRepository: StudentRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(ExamRepository)
    private readonly examRepository: ExamRepository,
    private readonly jwtService: JwtService,
  ) {}
    async joinExam(req: Request, examId: number, examCode?: string): Promise<Student> {
            const token = req.cookies?.token;
            if (!token) throw new UnauthorizedException('Missing authentication token!');
          
            const decoded: any = this.jwtService.verify(token, {
              secret: process.env.JWT_SECRET,
            });
            const userId = decoded.sub;
            const user = await this.userRepository.findOneBy({ user_id: userId });
            if (!user) throw new NotFoundException('User not found');

            const exam = await this.examRepository.findOneBy({ exam_id: examId });
            if (!exam) throw new NotFoundException('Exam not found');

            const existing = await this.studentRepository.findByStudentAndExam(userId, examId);
            if (existing) throw new BadRequestException('User already joined this exam');

            if (exam.status === 'private' && exam.code !== examCode) {
            throw new BadRequestException('Invalid exam code');
            }

            const student = await this.studentRepository.createByStudentAndExam(userId, examId);
            const savedStudent = await this.studentRepository.save(student);
            return savedStudent;
        }
}
