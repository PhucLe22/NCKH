import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { UserRepository } from '../user/user.repository';

@Module({
  providers: [
    TeacherService,
    TeacherRepository,
    UserRepository,
  ],
  controllers: [TeacherController],
  imports: [TypeOrmModule.forFeature([Teacher])]
})
export class TeacherModule {}
