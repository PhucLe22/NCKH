import { Injectable } from '@nestjs/common';
import { OptionRepository } from './option.repositoy';
import { Option } from './option.entity';

@Injectable()
export class OptionService {
    constructor(
        private readonly optionRepository: OptionRepository,
    ) {}

    async findOptionByQuestionId(question_id: number) {
        return this.optionRepository.findOptionByQuestionId(question_id);
    }

    async updateOptionByQuestionId(question_id: number, optionData: Partial<Option>) {
        return this.optionRepository.updateOptionByQuestionId(question_id, optionData);
    }
    async deleteOptionByQuestionId(question_id: number) {
        return this.optionRepository.deleteOptionByQuestionId(question_id);
    }
}
