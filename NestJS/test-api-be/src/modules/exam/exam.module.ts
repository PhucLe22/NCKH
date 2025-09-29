import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { ExamRepository } from './exam.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam.entity';

@Module({
  providers: [
    ExamService,
    ExamRepository
  ],
  controllers: [ExamController],
  imports: [TypeOrmModule.forFeature([Exam])],
})
export class ExamModule {}
