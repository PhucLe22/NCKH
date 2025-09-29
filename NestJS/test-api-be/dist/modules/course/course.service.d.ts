import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { UpdateCourseDto, CreateCourseDto } from './course.dto';
export declare class CourseService {
    private readonly courseRepository;
    constructor(courseRepository: CourseRepository);
    findAll(): Promise<Course[]>;
    findById(id: number): Promise<Course | null>;
    deleteById(id: number): Promise<Course | null>;
    createCourse(courseData: CreateCourseDto): Promise<Course>;
    updateCourse(id: number, courseData: UpdateCourseDto): Promise<Course | null>;
}
