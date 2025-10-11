import { Controller } from '@nestjs/common';
import { AIService } from './ai_agent.service';

@Controller('ai-agent')
export class AiAgentController {
    constructor(private readonly aiAgentService: AIService) {}
}
