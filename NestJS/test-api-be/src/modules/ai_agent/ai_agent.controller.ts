import { Controller, Post, Body } from '@nestjs/common';
import { AiAgentService } from './ai_agent.service';

@Controller('ai-agent')
export class AiAgentController {
    constructor(private readonly aiAgentService: AiAgentService) {}

    
    @Post("/generate-questions-from-text")
    generateQuestions(@Body() body: { text: string, examId: number }) {
        return this.aiAgentService.generateQuestions(body.text, body.examId);
    }
    @Post("/review-exam")
    reviewExam(@Body() body: { examId: number }) {
        return this.aiAgentService.reviewExam(body.examId);
    }
}
