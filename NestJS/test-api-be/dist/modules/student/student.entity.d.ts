import { User } from '../user/user.entity';
import { Exam } from '../exam/exam.entity';
import { Notification } from '../notification/notification.entity';
export declare class Student {
    student_id: number;
    grade: string;
    user: User;
    exams: Exam[];
    notifications: Notification[];
    createdAt: Date;
    updatedAt: Date;
}
