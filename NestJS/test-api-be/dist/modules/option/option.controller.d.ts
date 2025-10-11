import { OptionService } from './option.service';
import { Option } from './option.entity';
export declare class OptionController {
    private readonly optionService;
    constructor(optionService: OptionService);
    findOptionByQuestionId(questionId: string): Promise<Option[]>;
    updateOptionByQuestionId(questionId: string, optionData: Partial<Option>): Promise<import("typeorm").UpdateResult>;
    deleteOptionByQuestionId(questionId: string): Promise<import("typeorm").DeleteResult>;
}
