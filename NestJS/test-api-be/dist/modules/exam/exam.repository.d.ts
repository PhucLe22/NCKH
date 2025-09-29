import { DataSource, Repository } from 'typeorm';
import { Exam } from './exam.entity';
export declare class ExamRepository extends Repository<Exam> {
    private dataSource;
    constructor(dataSource: DataSource);
}
