import { AiAgentService } from './ai_agent.service';
export declare class AiAgentController {
    private readonly aiAgentService;
    constructor(aiAgentService: AiAgentService);
    generateQuestions(body: {
        text: string;
        examId: number;
    }): Promise<import("../question/question.entity").Question[]>;
    reviewExam(body: {
        examId: number;
    }): Promise<unknown>;
}
