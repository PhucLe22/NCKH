import { User } from '../user/user.entity';
import { Exam } from '../exam/exam.entity';
export declare class Teacher {
    teacher_id: number;
    department: string;
    user: User;
    exams: Exam[];
    createdAt: Date;
    updatedAt: Date;
}
