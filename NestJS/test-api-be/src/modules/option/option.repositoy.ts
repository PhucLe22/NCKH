import {Injectable} from '@nestjs/common';
import {DataSource,Repository} from 'typeorm';
import { Option } from '../../modules/option/option.entity';

@Injectable()
export class OptionRepository extends Repository<Option> {
    constructor(private dataSource: DataSource) {
        super(Option, dataSource.createEntityManager());
    }
    async createOption(optionData: Partial<Option>) {
        const option = this.create(optionData);
        return this.save(option);
    }
    async findOptionByQuestionId(question_id: number) {
        return this.find({ where: { question: { question_id: question_id } } });
    }
    async updateOptionByQuestionId(question_id: number, optionData: Partial<Option>) {
        return this.update({ question: { question_id: question_id } }, optionData);
    }
    async deleteOptionByQuestionId(question_id: number) {
        return this.delete({ question: { question_id: question_id } });
    }
}