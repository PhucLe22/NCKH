import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {Teacher} from './teacher.entity';
import { CreateTeacherDto } from './dto/createTeacher.dto';

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
    constructor(private dataSource: DataSource) {
        super(Teacher, dataSource.createEntityManager());
    }
}