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
}