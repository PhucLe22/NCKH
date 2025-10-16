import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentRepository } from './student.repository';
import { Student } from './student.entity';
import { UserModule } from '../user/user.module';
import { ExamModule } from '../exam/exam.module';

@Module({
  providers: [
    StudentService,
    StudentRepository,
  ],
  controllers: [StudentController],
  imports: [TypeOrmModule.forFeature([Student]),UserModule,ExamModule],
  exports: [StudentService, StudentRepository],
})
export class StudentModule {}
