import { Injectable } from '@nestjs/common';
import { Course } from './course.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateCourseDto, CreateCourseDto } from './course.dto';


@Injectable()
export class CourseRepository extends Repository<Course> {
    constructor(private dataSource: DataSource) {
        super(Course, dataSource.createEntityManager());
    }
    async findById(id: number): Promise<Course | null> {
        return this.findOne({ where: { id } });
    }
    async deleteById(id: number): Promise<Course | null> {
        const course = await this.findOne({ where: { id } });
        if (!course) return null; 
        await this.remove(course); 
        return course; 
    }
    async createCourse(courseData: CreateCourseDto): Promise<Course> {
        return this.save(courseData);
    }
    async updateCourse(id: number, courseData: UpdateCourseDto): Promise<Course | null> {
        const courseUpdate = await this.findOne({ where: { id } });
        if (!courseUpdate) 
            return null; 
        await this.update(id, courseData); 
        return courseUpdate; 
    }
}
