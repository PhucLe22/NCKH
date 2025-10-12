import { DataSource, Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
export declare class TeacherRepository extends Repository<Teacher> {
    private dataSource;
    constructor(dataSource: DataSource);
    addTeacher(data: {
        userId: string;
        department: string;
    }): Promise<Teacher>;
    getTeacherByUserId(userId: number): Promise<Teacher>;
    getTeacherById(id: number): Promise<Teacher>;
    getAllTeachers(): Promise<Teacher[]>;
}
