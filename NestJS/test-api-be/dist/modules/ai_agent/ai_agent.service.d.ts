import { QuestionRepository } from '../question/question.repository';
import { ExamRepository } from '../exam/exam.repository';
import { Question } from '../question/question.entity';
export declare class AiAgentService {
    private readonly aiUrl;
    private readonly questionRepository;
    private readonly examRepository;
    constructor(aiUrl: string, questionRepository: QuestionRepository, examRepository: ExamRepository);
    generateQuestions(text: string, examId: number): Promise<Question[]>;
    reviewExam(examId: number): Promise<unknown>;
}
