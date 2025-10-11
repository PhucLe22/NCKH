import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TeacherRequest } from './teacherRequest.entity';

@Injectable()
export class TeacherRequestRepository extends Repository<TeacherRequest> {
  constructor(private dataSource: DataSource) {
    super(TeacherRequest, dataSource.createEntityManager());
  }
}
