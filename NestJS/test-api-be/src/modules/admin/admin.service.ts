import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './dto/admin.create.dto';
import { Admin } from './admin.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminService {
    constructor(private readonly adminRepository: AdminRepository, private readonly configService: ConfigService) {}
    async createAdmin(CreateAdminDto: CreateAdminDto): Promise<Admin> {
      console.log(CreateAdminDto.adminCode);
      console.log(this.configService.get('ADMIN_SECURITY'));
      if(CreateAdminDto.adminCode !== this.configService.get('ADMIN_SECURITY')) {
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
      const admin = await this.adminRepository.findOne({where: {email: email}});
      if (!admin) {
        throw new Error('Admin not found');
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }
      return "Login successfully in administration";
    }

    async deleteAdmin(id: number, adminCode: string): Promise<void> {
      if(adminCode !== this.configService.get('ADMIN_SECURITY')) {
        throw new Error('Invalid admin security code');
      }
      await this.adminRepository.deleteAdmin(id, adminCode);
    }
}