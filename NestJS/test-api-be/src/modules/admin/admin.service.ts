import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/createAdmin.dto';

@Injectable()
export class AdminService {
  private admins: Admin[] = [];

  findAll(): Admin[] {
    return this.admins;
  }

  create(dto: CreateAdminDto): Admin {
    const admin: Admin = {
      id: Date.now(),
      username: dto.username,
      password: dto.password,
      email: dto.email,
    };
    this.admins.push(admin);
    return admin;
  }
}