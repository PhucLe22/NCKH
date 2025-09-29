import { CourseService } from './course.service';
import { UpdateCourseDto } from './course.dto';
import { CreateCourseDto } from './course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    findAll(): Promise<import("./course.entity").Course[]>;
    findById(id: number): Promise<import("./course.entity").Course>;
    deleteById(id: number): Promise<import("./course.entity").Course>;
    updateCourse(id: number, body: UpdateCourseDto): Promise<string>;
    createCourse(body: CreateCourseDto): Promise<string>;
}
