import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import {UserRepository} from '../user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../../modules/question/question.entity';

@Module({
  providers: [
    QuestionService,
    UserRepository
  ],
  controllers: [QuestionController],
  imports: [TypeOrmModule.forFeature([Question])],
})
export class QuestionModule {}
