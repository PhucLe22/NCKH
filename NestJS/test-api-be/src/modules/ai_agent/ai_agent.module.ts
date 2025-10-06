import { Module } from '@nestjs/common';
import { AiAgentService } from './ai_agent.service';
import { AiAgentController } from './ai_agent.controller';
import { QuestionRepository } from '../question/question.repository';
import { ExamRepository } from '../exam/exam.repository';
import { Question } from '../question/question.entity';
import { Exam } from '../exam/exam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [
    {
      provide: "AI_AGENT_URL",
      useValue: "http://localhost:8000/api"
    },
    AiAgentService, 
    QuestionRepository, 
    ExamRepository],
  controllers: [AiAgentController],
  imports: [TypeOrmModule.forFeature([Question, Exam])],
  exports: [AiAgentService]
})
export class AiAgentModule {}
