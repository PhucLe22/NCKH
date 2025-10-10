import { ExamRepository } from './exam.repository';
import { Exam } from './exam.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateExamDto } from './dto/exam.create.dto';
import { UpdateExamDto } from './dto/exam.update.dto';
import { TeacherRepository } from '../teacher/teacher.repository';
import { VerifyExamCodeDto } from './dto/exam.verify.dto';
export declare class ExamService {
    private readonly examRepository;
    private readonly jwtService;
    private readonly teacherRepository;
    constructor(examRepository: ExamRepository, jwtService: JwtService, teacherRepository: TeacherRepository);
    createExam(createExamDto: CreateExamDto, req: Request): Promise<Exam>;
    findAll(): Promise<any[]>;
    updateExamById(exam_id: number, UpdateExamDto: UpdateExamDto, req: Request): Promise<{
        message: string;
    }>;
    deleteExamById(exam_id: number, req: Request): Promise<{
        message: string;
    }>;
    verifyExamCode(exam_id: number, VerifyExamCodeDto: VerifyExamCodeDto): Promise<{
        message: string;
    }>;
    findExamsByTeacher(req: Request): Promise<Exam[]>;
}
