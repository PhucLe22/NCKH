import { DataSource, Repository } from 'typeorm';
import { Question } from './question.entity';
export declare class QuestionRepository extends Repository<Question> {
    private dataSource;
    constructor(dataSource: DataSource);
}
