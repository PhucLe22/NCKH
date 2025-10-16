import { DataSource, Repository } from 'typeorm';
import { Student } from './student.entity';
export declare class StudentRepository extends Repository<Student> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByStudentAndExam(userId: number, examId: number): Promise<Student>;
    createByStudentAndExam(userId: number, examId: number): Promise<Student>;
}
