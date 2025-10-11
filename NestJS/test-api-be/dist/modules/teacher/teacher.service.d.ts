import { Repository, DataSource } from 'typeorm';
import { TeacherRequest } from './teacherRequest.entity';
import { Teacher } from './teacher.entity';
import { User } from '../user/user.entity';
import { CreateTeacherRequestDto } from './dto/createTeacher.dto';
export declare class TeacherService {
    private teacherRequestRepo;
    private userRepo;
    private teacherRepo;
    private dataSource;
    constructor(teacherRequestRepo: Repository<TeacherRequest>, userRepo: Repository<User>, teacherRepo: Repository<Teacher>, dataSource: DataSource);
    requestRegister(dto: CreateTeacherRequestDto): Promise<TeacherRequest>;
    approveRequest(id: number): Promise<Teacher>;
}
