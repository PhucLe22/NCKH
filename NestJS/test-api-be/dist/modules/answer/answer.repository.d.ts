import { DataSource, Repository } from "typeorm";
import { Answer } from "../../modules/answer/answer.entity";
export declare class AnswerRepository extends Repository<Answer> {
    private dataSource;
    constructor(dataSource: DataSource);
}
