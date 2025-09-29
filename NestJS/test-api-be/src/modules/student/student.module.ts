import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentRepository } from './student.repository';
import { Student } from './student.entity';

@Module({
  providers: [
    StudentService,
    StudentRepository,
  ],
  controllers: [StudentController],
  imports: [TypeOrmModule.forFeature([Student])],
})
export class StudentModule {}
