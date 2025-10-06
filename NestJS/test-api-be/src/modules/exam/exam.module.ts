import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { ExamRepository } from './exam.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam.entity';
import { TeacherRepository } from '../teacher/teacher.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [
    ExamService,
    ExamRepository,
    TeacherRepository,
    JwtService,
    AuthModule,
  ],
  controllers: [ExamController],
  imports: [TypeOrmModule.forFeature([Exam])],
  exports: [ExamService],
})
export class ExamModule {}
