import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/exam.create.dto';
import { UpdateExamDto } from './dto/exam.update.dto';
import { Request } from 'express';
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    createExam(createExamDto: CreateExamDto, req: Request): Promise<import("./exam.entity").Exam>;
    updateExam(id: number, updateExamDto: UpdateExamDto, req: Request): Promise<{
        message: string;
    }>;
    deleteExam(id: number, req: Request): Promise<{
        message: string;
    }>;
}
