import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/exam.create.dto';
import { UpdateExamDto } from './dto/exam.update.dto';
import { Request } from 'express';
import { VerifyExamCodeDto } from './dto/exam.verify.dto';
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    createExam(createExamDto: CreateExamDto, req: Request): Promise<import("./exam.entity").Exam>;
    findExams(req: Request): Promise<any[]>;
    updateExam(id: number, updateExamDto: UpdateExamDto, req: Request): Promise<{
        message: string;
    }>;
    deleteExam(id: number, req: Request): Promise<{
        message: string;
    }>;
    verifyExamCode(id: number, verifyExamCodeDto: VerifyExamCodeDto): Promise<{
        message: string;
    }>;
    findExamsByTeacher(req: Request): Promise<import("./exam.entity").Exam[]>;
    createExamFromAIFile(examId: number, file: Express.Multer.File, req: Request): Promise<{
        message: string;
        exam_id: number;
        questions: any;
        savedQuestions: number;
    }>;
}
