import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';

@Module({
  providers: [
    TeacherService,
    TeacherRepository
  ],
  controllers: [TeacherController],
  imports: [TypeOrmModule.forFeature([Teacher])]
})
export class TeacherModule {}
