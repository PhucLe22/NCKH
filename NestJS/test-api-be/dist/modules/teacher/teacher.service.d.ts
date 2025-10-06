import { TeacherRepository } from './teacher.repository';
import { UserRepository } from '../user/user.repository';
import { CreateTeacherDto } from './dto/teacher.create.dto';
export declare class TeacherService {
    private readonly teacherRepository;
    private readonly userRepository;
    constructor(teacherRepository: TeacherRepository, userRepository: UserRepository);
    createTeacher(body: CreateTeacherDto): Promise<{
        message: string;
        teacher: import("./teacher.entity").Teacher;
    }>;
}
