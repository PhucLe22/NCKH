import { DataSource, Repository } from 'typeorm';
import { Question } from './question.entity';
export declare class QuestionRepository extends Repository<Question> {
    private dataSource;
    constructor(dataSource: DataSource);
    createQuestion(question: Question): Promise<Question>;
    findAll(): Promise<Question[]>;
    deleteById(id: number): Promise<import("typeorm").DeleteResult>;
    updateById(id: number, question: Question): Promise<import("typeorm").UpdateResult>;
    findQuestionByExamId(exam_id: number): Promise<Question[]>;
    deleteQuestionByExamId(exam_id: number): Promise<import("typeorm").DeleteResult>;
}
