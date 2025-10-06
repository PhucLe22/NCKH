import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/exam.create.dto';
import { Request } from 'express';
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    createExam(createExamDto: CreateExamDto, req: Request): Promise<import("./exam.entity").Exam>;
}
