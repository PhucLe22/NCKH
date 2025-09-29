import { Course } from './course.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateCourseDto, CreateCourseDto } from './course.dto';
export declare class CourseRepository extends Repository<Course> {
    private dataSource;
    constructor(dataSource: DataSource);
    findById(id: number): Promise<Course | null>;
    deleteById(id: number): Promise<Course | null>;
    createCourse(courseData: CreateCourseDto): Promise<Course>;
    updateCourse(id: number, courseData: UpdateCourseDto): Promise<Course | null>;
}
