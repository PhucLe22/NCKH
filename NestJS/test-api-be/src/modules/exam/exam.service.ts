import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExamRepository } from './exam.repository';
import { Exam } from './exam.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateExamDto } from './dto/exam.create.dto';
import { UpdateExamDto } from './dto/exam.update.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { TeacherRepository } from '../teacher/teacher.repository';
import { VerifyExamCodeDto } from './dto/exam.verify.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ExamService {
  constructor(
    private readonly examRepository: ExamRepository,
    private readonly jwtService: JwtService,
    private readonly teacherRepository: TeacherRepository,
  ) { }

  async createExam(createExamDto: CreateExamDto, req: Request) {
    const exam = new Exam();
    exam.title = createExamDto.title;
    exam.description = createExamDto.description || '';
    exam.start_time = createExamDto.start_time;
    exam.end_time = createExamDto.end_time;
    exam.duration = createExamDto.duration;
    exam.code = createExamDto.code;

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

  async findAll() {
    const exams = await this.examRepository.findAll();
    const resList = [];
    for(const exam of exams)
    {
      if(exam.status != 'private'){
        resList.push({
          exam_id: exam.exam_id,
          title: exam.title,
          description: exam.description,
          start_time: exam.start_time,
          end_time: exam.end_time,
          duration: exam.duration,
          status: exam.status,
          createdAt: exam.createdAt,
          updatedAt: exam.updatedAt,
        })
      }
    }
    return resList;
  }

  async updateExamById(exam_id: number, UpdateExamDto: UpdateExamDto, req: Request) {
    const token = req.cookies?.token;
    const decoded: any = this.jwtService.decode(token);
    const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
    if (!teacher) {
      throw new NotFoundException('Teacher not found for this user!');
    }

    const examToUpdate = await this.examRepository.findExamById(exam_id);
    if (!examToUpdate) {
      throw new NotFoundException(`Exam not found with ID: ${exam_id}!`);
    }

    if (examToUpdate.teacher.teacher_id !== teacher.teacher_id) {
      throw new ForbiddenException('You do not have permission to edit this exam!');
    }
    await this.examRepository.updateExam(exam_id, UpdateExamDto);
    return { message: 'Update exam successfully!' };
  }

  async deleteExamById(exam_id: number, req: Request) {
    const token = req.cookies?.token;
    const decoded: any = this.jwtService.decode(token);
    const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
    if (!teacher) {
      throw new NotFoundException('Teacher not found for this user!');
    }

    const examToDelete = await this.examRepository.findExamById(exam_id);
    if (!examToDelete) {
      throw new NotFoundException(`Exam not found with ID: ${exam_id}!`);
    }

    if (examToDelete.teacher.teacher_id !== teacher.teacher_id) {
      throw new ForbiddenException('You do not have permission to delete this exam!');
    }
    await this.examRepository.deleteExam(exam_id);
    return { message: 'Delete exam successfully!' };
  }
  async verifyExamCode(exam_id: number, VerifyExamCodeDto: VerifyExamCodeDto) {
    const exam = await this.examRepository.findExamById(exam_id);
    if (!exam) {
      throw new NotFoundException(`Exam not found with ID: ${exam_id}!`);
    }

    const isValid = await bcrypt.compare(VerifyExamCodeDto.code, exam.code);
    if (!isValid) {
      throw new UnauthorizedException('Invalid exam code!');
    }

    return { message: 'Exam code is valid!' };
  }
  async findExamsByTeacher(req: Request) {
    const token = req.cookies?.token;
    if (!token) throw new UnauthorizedException('Missing authentication token!');
  
    const decoded: any = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  
    const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
    if (!teacher) {
      throw new NotFoundException('Teacher not found for this user!');
    }
  
    const exams = await this.examRepository.find({
      where: { teacher: { teacher_id: teacher.teacher_id } },
      relations: ['teacher', 'questions'],
    });
  
    if (!exams.length) {
      throw new NotFoundException('No exams found for this teacher!');
    }
    return exams
  }
}
