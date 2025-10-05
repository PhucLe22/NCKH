import { TeacherService } from './teacher.service';
import { CreateUserDto } from '../user/dto/user.create.dto';
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    createTeacher(body: CreateUserDto): Promise<import("../user/user.entity").User>;
}
