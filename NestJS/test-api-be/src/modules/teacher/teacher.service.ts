import { Injectable } from '@nestjs/common';
import { TeacherRepository } from './teacher.repository';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from '../user/dto/user.create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
    constructor(private readonly teacherRepository: TeacherRepository, private readonly userRepository: UserRepository) {}
    async createTeacher(body: CreateUserDto) {
        const role = 'teacher';
    
        const existingUser = await this.userRepository.findByEmail(body.email);
        if (existingUser) {
          throw new Error('User already exists');
        }
    
        // Hash password trước khi lưu
        const hashedPassword = await bcrypt.hash(body.password, 10);
    
        const newUser = await this.userRepository.createUser({
          username: body.username,
          email: body.email,
          password: hashedPassword,
          role: role,
        });
    
        return await this.userRepository.save(newUser);
      }
}
