import { TeacherRepository } from './teacher.repository';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from '../user/dto/user.create.dto';
export declare class TeacherService {
    private readonly teacherRepository;
    private readonly userRepository;
    constructor(teacherRepository: TeacherRepository, userRepository: UserRepository);
    createTeacher(body: CreateUserDto): Promise<import("../user/user.entity").User>;
}
