import { Module } from '@nestjs/common';
import { AiAgentService } from './ai_agent.service';
import { AiAgentController } from './ai_agent.controller';

@Module({
  providers: [AiAgentService],
  controllers: [AiAgentController]
})
export class AiAgentModule {}
