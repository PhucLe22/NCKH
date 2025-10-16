import { StudentService } from './student.service';
import { StudentAttendExamDto } from './dto/student.attend.exam.dto';
import { RequestWithUser } from '../auth/types';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    joinExam(joinExamDto: StudentAttendExamDto, req: RequestWithUser): Promise<import("./student.entity").Student>;
}
