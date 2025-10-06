import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Exam } from './exam.entity';

@Injectable()
export class ExamRepository extends Repository<Exam> {
    constructor(private dataSource: DataSource) {
        super(Exam, dataSource.createEntityManager());
    }
    async createExam(exam: Exam) {
        return this.save(exam);
    }
    async findAll() {
        return this.find({
            relations: ['questions'],
          });
    }
    async findById(id: number) {
        return this.findById(id);
    }
}

