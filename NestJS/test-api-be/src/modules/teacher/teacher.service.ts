import { Injectable } from '@nestjs/common';
import { TeacherRepository } from './teacher.repository';
import { UserRepository } from '../user/user.repository';
import { CreateTeacherDto } from './dto/teacher.create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
    constructor(private readonly teacherRepository: TeacherRepository, private readonly userRepository: UserRepository) {}
    async createTeacher(body: CreateTeacherDto) {
      const role = 'teacher';
    
      const existingUser = await this.userRepository.findByEmail(body.email);
      if (existingUser) {
        throw new Error('User already exists');
      }
    
      const hashedPassword = await bcrypt.hash(body.password, 10);
    
      const newUser = await this.userRepository.createUser({
        username: body.username,
        email: body.email,
        password: hashedPassword,
        role: 'teacher',
      });

      const newTeacher = await this.teacherRepository.addTeacher({
        userId: newUser.user_id.toString(),
        department: body.department,
      });
      return {
        message: 'Teacher registered successfully',
        teacher: newTeacher,
      };
    }
}
