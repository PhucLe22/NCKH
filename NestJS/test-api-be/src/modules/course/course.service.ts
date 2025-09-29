import { Injectable } from '@nestjs/common';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { UpdateCourseDto, CreateCourseDto } from './course.dto';

@Injectable()
export class CourseService {
    constructor(private readonly courseRepository: CourseRepository) {}

    async findAll(): Promise<Course[]> {
        return this.courseRepository.find();
    }
    async findById(id: number): Promise<Course | null> {
        return this.courseRepository.findById(id);
    }
    async deleteById(id: number): Promise<Course | null> {
        return this.courseRepository.deleteById(id);
    }
    async createCourse(courseData: CreateCourseDto): Promise<Course> {
        return this.courseRepository.createCourse(courseData);
    }
    async updateCourse(id: number, courseData: UpdateCourseDto): Promise<Course | null> {
        return this.courseRepository.updateCourse(id, courseData);
    }
}
