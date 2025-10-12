import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/teacher.create.dto';
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    createTeacher(body: CreateTeacherDto): Promise<{
        message: string;
        teacher: {
            teacher_id: number;
            department: string;
            status: import("./teacher.entity").TeacherStatus;
            user: {
                user_id: number;
                username: string;
                email: string;
                role: string;
            };
        };
    }>;
}
