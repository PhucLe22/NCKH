import { User } from '../user/user.entity';
import { Exam } from '../exam/exam.entity';
export declare enum TeacherStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Teacher {
    teacher_id: number;
    department: string;
    status: TeacherStatus;
    user: User;
    exams: Exam[];
    createdAt: Date;
    updatedAt: Date;
}
