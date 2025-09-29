import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import {AnswerRepository} from './answer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';

@Module({
  providers: [
    AnswerService,
    AnswerRepository,
  ],
  controllers: [AnswerController],
  imports: [TypeOrmModule.forFeature([Answer])],
})
export class AnswerModule {}
