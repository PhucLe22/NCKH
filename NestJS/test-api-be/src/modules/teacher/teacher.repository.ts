import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {Teacher} from './teacher.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
    constructor(private dataSource: DataSource) {
        super(Teacher, dataSource.createEntityManager());
    }
    async addTeacher(data: { userId: string; department: string }) {
        const teacher = new Teacher();
        teacher.department = data.department;
        teacher.user = await this.dataSource
          .getRepository(User)
          .findOne({ where: { user_id: parseInt(data.userId) } });
        teacher.createdAt = new Date();
        teacher.updatedAt = new Date();
    
        return this.save(teacher);
      }
    async getTeacherByUserId(userId: number) {
        return this.findOne({
          where: {
            user: { user_id: userId },
          },
          relations: ['user'],
        });
      }
      
    async getTeacherById(id: number) {
        return this.findOne({ where: { teacher_id: id } });
    }
}