import { QuestionRepository } from './question.repository';
import { ExamRepository } from '../exam/exam.repository';
import { CreateQuestionDto } from './dto/question.create.dto';
export declare class QuestionService {
    private readonly questionRepository;
    private readonly examRepository;
    constructor(questionRepository: QuestionRepository, examRepository: ExamRepository);
    saveQuestions(examId: number, questions: CreateQuestionDto[]): Promise<import("./question.entity").Question[]>;
}
