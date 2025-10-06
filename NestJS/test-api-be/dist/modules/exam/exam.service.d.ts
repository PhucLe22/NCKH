import { ExamRepository } from './exam.repository';
import { Exam } from './exam.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateExamDto } from './dto/exam.create.dto';
import { TeacherRepository } from '../teacher/teacher.repository';
export declare class ExamService {
    private readonly examRepository;
    private readonly jwtService;
    private readonly teacherRepository;
    constructor(examRepository: ExamRepository, jwtService: JwtService, teacherRepository: TeacherRepository);
    createExam(createExamDto: CreateExamDto, req: Request): Promise<Exam>;
}
