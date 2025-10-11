export declare class TeacherRequest {
    id: number;
    username: string;
    password: string;
    email: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}
