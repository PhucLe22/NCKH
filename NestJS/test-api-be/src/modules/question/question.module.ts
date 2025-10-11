import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { UserRepository } from '../user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionRepository } from './question.repository';
import { ExamModule } from '../exam/exam.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    ExamModule,
  ],
  providers: [
    QuestionService,
    UserRepository,
    QuestionRepository,
  ],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
