import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { ExamRepository } from './exam.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam.entity';
import { TeacherRepository } from '../teacher/teacher.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { StudentRepository } from '../student/student.repository';
import { Question } from '../question/question.entity';
import { Option } from '../option/option.entity';
import { Answer } from '../answer/answer.entity';
import { QuestionRepository } from '../question/question.repository';
import { OptionRepository } from '../option/option.repositoy';
import { AnswerRepository } from '../answer/answer.repository';
import { Teacher } from '../teacher/teacher.entity';
import { Student } from '../student/student.entity';
import { AIService } from '../ai_agent/ai_agent.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,       
    HttpModule,         
    AuthModule,         
    TypeOrmModule.forFeature([
      Exam,
      Question,
      Option,
      Answer,
      Teacher,
      Student,
    ]),
  ],
  controllers: [ExamController],
  providers: [
    ExamService,
    ExamRepository,
    QuestionRepository,
    OptionRepository,
    AnswerRepository,
    TeacherRepository,
    StudentRepository,
    AIService,
    JwtService,
  ],
  exports: [ExamService, ExamRepository],
})
export class ExamModule {}
