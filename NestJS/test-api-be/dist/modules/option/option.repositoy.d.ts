import { DataSource, Repository } from 'typeorm';
import { Option } from '../../modules/option/option.entity';
export declare class OptionRepository extends Repository<Option> {
    private dataSource;
    constructor(dataSource: DataSource);
    createOption(optionData: Partial<Option>): Promise<Option>;
    findOptionByQuestionId(question_id: number): Promise<Option[]>;
    updateOptionByQuestionId(question_id: number, optionData: Partial<Option>): Promise<import("typeorm").UpdateResult>;
    deleteOptionByQuestionId(question_id: number): Promise<import("typeorm").DeleteResult>;
}
