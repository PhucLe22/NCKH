import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './dto/admin.create.dto';
import { Admin } from './admin.entity';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/user.repository';
import { TeacherRepository } from '../teacher/teacher.repository';
import { TeacherStatus } from '../teacher/teacher.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async createAdmin(CreateAdminDto: CreateAdminDto): Promise<Admin> {
    if (CreateAdminDto.adminCode !== this.configService.get('ADMIN_SECURITY')) {
      throw new Error('Invalid admin security code');
    }
    const hashPassword = await bcrypt.hash(CreateAdminDto.password, 10);
    const hashAdminCode = await bcrypt.hash(CreateAdminDto.adminCode, 10);
    CreateAdminDto.password = hashPassword;
    CreateAdminDto.adminCode = hashAdminCode;
    const admin = this.adminRepository.createAdmin(CreateAdminDto);
    return admin;
  }

  async loginAdmin(email: string, password: string): Promise<string> {
    const admin = await this.adminRepository.findOne({ where: { email: email } });
    if (!admin) {
      throw new Error('Admin not found');
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    return 'Login successfully in administration';
  }

  async getAllUsers() {
    const users = await this.userRepository.find({
      select: ['user_id', 'username', 'email', 'role', 'status', 'createdAt', 'updatedAt'],
      order: { createdAt: 'DESC' },
    });

    return {
      total: users.length,
      users: users,
    };
  }

  async getAllTeachers() {
    const teacherRepository = new TeacherRepository(this.adminRepository['dataSource']);
    const teachers = await teacherRepository.getAllTeachers();

    const teachersData = teachers.map((teacher) => ({
      teacher_id: teacher.teacher_id,
      department: teacher.department,
      role: teacher.user.role,
      status: teacher.status,
      user_id: teacher.user.user_id,
      username: teacher.user.username,
      email: teacher.user.email,
      createdAt: teacher.createdAt,
      updatedAt: teacher.updatedAt,
    }));

    return {
      total: teachersData.length,
      teachers: teachersData,
    }
  }

  async deleteAdmin(id: number, adminCode: string): Promise<void> {
    if (adminCode !== this.configService.get('ADMIN_SECURITY')) {
      throw new Error('Invalid admin security code');
    }
    await this.adminRepository.deleteAdmin(id, adminCode);
  }

  async updateTeacherStatus(id: number, status: string) {
    const teacherRepository = new TeacherRepository(this.adminRepository['dataSource']);
    
    if (!Object.values(TeacherStatus).includes(status as TeacherStatus)) {
      throw new Error('Invalid status. Must be one of: pending, approved, rejected');
    }

    const teacher = await teacherRepository.getTeacherById(id);
    
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    teacher.status = status as TeacherStatus;
    teacher.updatedAt = new Date();
    
    await teacherRepository.save(teacher);

    return {
      message: 'Teacher status updated successfully',
      teacher: {
        teacher_id: teacher.teacher_id,
        status: teacher.status,
        updatedAt: teacher.updatedAt,
      },
    };
  }
}