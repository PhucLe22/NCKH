import { Teacher } from '../teacher/teacher.entity';
import { Student } from '../student/student.entity';
import { Question } from '../question/question.entity';
import { Notification } from '../notification/notification.entity';
export declare class Exam {
    exam_id: number;
    title: string;
    description: string;
    start_time: Date;
    end_time: Date;
    duration: number;
    teacher: Teacher;
    students: Student[];
    questions: Question[];
    notifications: Notification[];
    createdAt: Date;
    updatedAt: Date;
}
