import { DataSource, Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
export declare class TeacherRepository extends Repository<Teacher> {
    private dataSource;
    constructor(dataSource: DataSource);
}
