import { OptionRepository } from './option.repositoy';
import { Option } from './option.entity';
export declare class OptionService {
    private readonly optionRepository;
    constructor(optionRepository: OptionRepository);
    findOptionByQuestionId(question_id: number): Promise<Option[]>;
    updateOptionByQuestionId(question_id: number, optionData: Partial<Option>): Promise<import("typeorm").UpdateResult>;
    deleteOptionByQuestionId(question_id: number): Promise<import("typeorm").DeleteResult>;
}
