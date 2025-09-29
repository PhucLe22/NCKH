import { Course } from '../course/course.entity';
export declare class User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    status: string;
    courses: Course[];
    createdAt: Date;
    updatedAt: Date;
}
