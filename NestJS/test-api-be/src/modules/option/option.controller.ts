import { Controller, Get, Param, Patch, Body, Delete } from '@nestjs/common';
import { OptionService } from './option.service';
import { Option } from './option.entity';

@Controller('option')
export class OptionController {
    constructor(private readonly optionService: OptionService) {}   
    
    @Get('/question/:questionId')
    async findOptionByQuestionId(@Param('questionId') questionId: string) {
        return this.optionService.findOptionByQuestionId(parseInt(questionId));
    }
    
    @Patch('/question/update/:questionId')
    async updateOptionByQuestionId(@Param('questionId') questionId: string, @Body() optionData: Partial<Option>) {
        return this.optionService.updateOptionByQuestionId(parseInt(questionId), optionData);
    }
    
    @Delete('/question/delete/:questionId')
    async deleteOptionByQuestionId(@Param('questionId') questionId: string) {
        return this.optionService.deleteOptionByQuestionId(parseInt(questionId));
    }
}
