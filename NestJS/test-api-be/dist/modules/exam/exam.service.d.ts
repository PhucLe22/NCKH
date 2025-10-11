import { ExamRepository } from './exam.repository';
import { Exam } from './exam.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateExamDto } from './dto/exam.create.dto';
import { UpdateExamDto } from './dto/exam.update.dto';
import { TeacherRepository } from '../teacher/teacher.repository';
import { VerifyExamCodeDto } from './dto/exam.verify.dto';
import { AIService } from '../ai_agent/ai_agent.service';
import { QuestionRepository } from '../question/question.repository';
import { OptionRepository } from '../option/option.repositoy';
import { AnswerRepository } from '../answer/answer.repository';
export declare class ExamService {
    private readonly examRepository;
    private readonly questionRepository;
    private readonly jwtService;
    private readonly teacherRepository;
    private readonly aiService;
    private readonly optionRepository;
    private readonly answerRepository;
    constructor(examRepository: ExamRepository, questionRepository: QuestionRepository, jwtService: JwtService, teacherRepository: TeacherRepository, aiService: AIService, optionRepository: OptionRepository, answerRepository: AnswerRepository);
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
    createExamFromAIFile(exam_id: number, file: Express.Multer.File, req: Request): Promise<{
        message: string;
        exam_id: number;
        questions: any;
        savedQuestions: number;
    }>;
}
