import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { TeacherRequest } from './teacherRequest.entity';
import { Teacher } from './teacher.entity';
import { User } from '../user/user.entity';
import { CreateTeacherRequestDto } from './dto/createTeacher.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherRequest)
    private teacherRequestRepo: Repository<TeacherRequest>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,

    private dataSource: DataSource, 
  ) {}

  async requestRegister(dto: CreateTeacherRequestDto): Promise<TeacherRequest> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const request = this.teacherRequestRepo.create({
      username: dto.username,
      password: hashedPassword,
      email: dto.email,
    });
    return await this.teacherRequestRepo.save(request);
  }

    async approveRequest(id: number): Promise<Teacher> {
    return await this.dataSource.transaction(async (manager) => {
        //  Lấy request đăng ký
        const req = await manager.findOne(TeacherRequest, { where: { id } });
        if (!req) throw new Error('Request not found');
        if (req.status !== 'pending') throw new Error('Request already processed');

        // Tạo user mới 
        const user = manager.create(User, {
        username: req.username,
        password: req.password, 
        email: req.email,
        role: 'teacher',
        status: 'active',
        });
        const savedUser = await manager.save(User, user);

        // Tạo teacher mới và gắn với user
        const teacher = manager.create(Teacher, {
        department: 'General',
        user: savedUser,
        });
        const savedTeacher = await manager.save(Teacher, teacher);

        // 4️⃣ Cập nhật trạng thái request
        req.status = 'approved';
        await manager.save(TeacherRequest, req);

        return savedTeacher;
    });
    }
}
