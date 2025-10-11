import { QuestionRepository } from './question.repository';
import { ExamRepository } from '../exam/exam.repository';
import { CreateQuestionDto } from './dto/question.create.dto';
export declare class QuestionService {
    private readonly questionRepository;
    private readonly examRepository;
    constructor(questionRepository: QuestionRepository, examRepository: ExamRepository);
    saveQuestions(examId: number, questions: CreateQuestionDto[]): Promise<import("./question.entity").Question[]>;
    findQuestionByExamId(exam_id: number): Promise<import("./question.entity").Question[]>;
    deleteQuestionByExamId(exam_id: number): Promise<import("typeorm").DeleteResult>;
    findAllQuestions(): Promise<import("./question.entity").Question[]>;
}
