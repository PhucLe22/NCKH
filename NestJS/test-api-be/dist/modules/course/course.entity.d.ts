import { User } from '../user/user.entity';
export declare class Course {
    id: number;
    name: string;
    description: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
