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
      const hashUsername = await bcrypt.hash(CreateAdminDto.username, 10);
      const hashAdminCode = await bcrypt.hash(CreateAdminDto.adminCode, 10);
      const hashEmail = await bcrypt.hash(CreateAdminDto.email, 10);
      CreateAdminDto.password = hashPassword;
      CreateAdminDto.email = hashEmail;
      CreateAdminDto.adminCode = hashAdminCode;
      CreateAdminDto.username = hashUsername;
      const admin = this.adminRepository.createAdmin(CreateAdminDto);
      return admin;
    }
}