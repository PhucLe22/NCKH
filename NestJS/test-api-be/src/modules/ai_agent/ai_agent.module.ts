import { Module } from '@nestjs/common';
import { AIService } from './ai_agent.service';
import { AiAgentController } from './ai_agent.controller';
import { QuestionRepository } from '../question/question.repository';
import { ExamRepository } from '../exam/exam.repository';
import { Question } from '../question/question.entity';
import { Exam } from '../exam/exam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: "AI_AGENT_URL",
      useValue: "http://localhost:8000/api"
    },
    AIService, 
    QuestionRepository, 
    ExamRepository],
  controllers: [AiAgentController],
  imports: [TypeOrmModule.forFeature([Question, Exam]), HttpModule, ConfigModule],
  exports: [AIService]
})
export class AiAgentModule {}
