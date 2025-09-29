import { DataSource, Repository } from 'typeorm';
import { Option } from '../../modules/option/option.entity';
export declare class OptionRepository extends Repository<Option> {
    private dataSource;
    constructor(dataSource: DataSource);
}
