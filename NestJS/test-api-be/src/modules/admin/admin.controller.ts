import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/admin.create.dto';
import { Admin } from './admin.entity';
import { AdminLoginDto } from './dto/admin.login.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async createAdmin(@Body() CreateAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.createAdmin(CreateAdminDto);
  }

  @Post('login')
  async loginAdmin(@Body() loginDto: AdminLoginDto): Promise<string> {
    return this.adminService.loginAdmin(loginDto.email, loginDto.password);
  }

  @Delete('delete/:id')
  async deleteAdmin(@Param('id') id: number, @Body() adminCode: string): Promise<void> {
    return this.adminService.deleteAdmin(id, adminCode);
  }
}