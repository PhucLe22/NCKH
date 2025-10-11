import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/question.create.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    createQuestion(examId: string, createQuestionDtos: CreateQuestionDto[]): Promise<import("./question.entity").Question[]>;
    getQuestionsByExamId(examId: string): Promise<import("./question.entity").Question[]>;
    deleteQuestionByExamId(examId: string): Promise<import("typeorm").DeleteResult>;
    findAllQuestions(): Promise<import("./question.entity").Question[]>;
}
