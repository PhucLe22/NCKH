export declare class AiAgentService {
    private readonly aiUrl;
    generateQuestions(text: string): Promise<unknown>;
    reviewExam(examId: number): Promise<unknown>;
}
