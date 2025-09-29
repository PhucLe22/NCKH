import { Student } from "../student/student.entity";
import { Exam } from "../exam/exam.entity";
export declare class Notification {
    id: number;
    title: string;
    content: string;
    isRead: boolean;
    createdAt: Date;
    student: Student;
    exam: Exam;
}
