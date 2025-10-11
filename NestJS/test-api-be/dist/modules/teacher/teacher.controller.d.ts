import { TeacherService } from './teacher.service';
import { CreateTeacherRequestDto } from './dto/createTeacher.dto';
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    registerRequest(dto: CreateTeacherRequestDto): Promise<import("./teacherRequest.entity").TeacherRequest>;
    approveRequest(id: number): Promise<import("./teacher.entity").Teacher>;
}
