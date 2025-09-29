import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Course} from './course.entity';
import {CourseRepository} from './course.repository';

@Module({
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseRepository,
  ],
  imports: [TypeOrmModule.forFeature([Course])],
  
})
export class CourseModule {}
