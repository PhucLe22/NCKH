import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { UserRepository } from '../user/user.repository';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { User } from '../user/user.entity';
import { Teacher } from '../teacher/teacher.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Teacher]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, UserRepository, ConfigService],
})
export class AdminModule {}