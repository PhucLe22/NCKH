import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { Teacher } from './teacher.entity';
import { TeacherRequest } from './teacherRequest.entity';
import { TeacherRequestRepository } from './teacherRequest.repository';
import { User } from '../user/user.entity';        // 👈 thêm
import { UserModule } from '../user/user.module';  // 👈 thêm

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, TeacherRequest, User]), 
    UserModule, 
  ],
  providers: [
    TeacherService,
    TeacherRepository,
    TeacherRequestRepository,
  ],
  controllers: [TeacherController],
})
export class TeacherModule {}
