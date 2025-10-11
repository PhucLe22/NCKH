import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/admin.create.dto';
import { Admin } from './admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async createAdmin(@Body() CreateAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.createAdmin(CreateAdminDto);
  }
}