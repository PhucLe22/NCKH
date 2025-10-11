import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Answer } from "../../modules/answer/answer.entity";

@Injectable()
export class AnswerRepository extends Repository<Answer> {
    constructor(private dataSource: DataSource) {
        super(Answer, dataSource.createEntityManager());
    }
    async createAnswer(answer: Partial<Answer>) {
        return this.save(answer);
    }
}