import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../modules/user/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  providers: [
    UserService,
    UserRepository
  ],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, UserRepository]
})
export class UserModule {}
