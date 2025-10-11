import { DataSource, Repository } from 'typeorm';
import { TeacherRequest } from './teacherRequest.entity';
export declare class TeacherRequestRepository extends Repository<TeacherRequest> {
    private dataSource;
    constructor(dataSource: DataSource);
}
