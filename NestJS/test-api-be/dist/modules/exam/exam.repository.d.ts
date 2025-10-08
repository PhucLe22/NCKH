import { DataSource, Repository } from 'typeorm';
import { Exam } from './exam.entity';
import { UpdateExamDto } from './dto/exam.update.dto';
export declare class ExamRepository extends Repository<Exam> {
    private dataSource;
    constructor(dataSource: DataSource);
    createExam(exam: Exam): Promise<Exam>;
    findAll(): Promise<Exam[]>;
    findExamById(exam_id: number): Promise<Exam>;
    updateExam(exam_id: number, UpdateExamDto: UpdateExamDto): Promise<import("typeorm").UpdateResult>;
    deleteExam(exam_id: number): Promise<import("typeorm").DeleteResult>;
    findTeacherIdByUserId(user_id: number): Promise<number>;
}
