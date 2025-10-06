import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/teacher.create.dto';
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    createTeacher(body: CreateTeacherDto): Promise<{
        message: string;
        teacher: import("./teacher.entity").Teacher;
    }>;
}
