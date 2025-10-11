import {Injectable} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {Question} from './question.entity';

@Injectable()
export class QuestionRepository extends Repository<Question> {
    constructor(private dataSource: DataSource) {
        super(Question, dataSource.createEntityManager());
    }
    async createQuestion(question: Question) {
        return this.save(question);
    }
    async findAll() {
        return this.find();
    }
    async deleteById(id: number) {
        return this.delete(id);
    }
    async updateById(id: number, question: Question) {
        return this.update(id, question);
    }
    async findQuestionByExamId(exam_id: number) {
        return this.find({ where: { exam: { exam_id: exam_id } } });
    }
    async deleteQuestionByExamId(exam_id: number) {
        return this.delete({ exam: { exam_id: exam_id } });
    }
}
