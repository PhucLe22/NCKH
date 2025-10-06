import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ExamModule } from '../exam/exam.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), ExamModule],
  providers: [
    TeacherService,
    TeacherRepository,
    UserRepository,
    JwtService,
  ],
  controllers: [TeacherController],
  exports: [TeacherService],
})
export class TeacherModule {}
