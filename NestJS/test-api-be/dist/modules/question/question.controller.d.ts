import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/question.create.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    createQuestion(examId: string, createQuestionDtos: CreateQuestionDto[]): Promise<import("./question.entity").Question[]>;
}
