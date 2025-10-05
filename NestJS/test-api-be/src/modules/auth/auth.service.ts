import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/user.create.dto';
import { Res } from '@nestjs/common';
import express from 'express';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

    async register(dto: CreateUserDto) {
        const hash = await bcrypt.hash(dto.password, 10);
        dto.password = hash;
        const user = await this.userRepository.createUser(dto);
        return user;
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid password');
        }
    
        const payload = { sub: user.user_id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload, {secret: process.env.JWT_SECRET, expiresIn: '2m'});
    
        return {
          access_token: token,
          user: {
            id: user.user_id,
            email: user.email,
            role: user.role,
          },
        };
      }
      async logout(@Res({ passthrough: true }) res: express.Response) {
        res.clearCookie('token');
        return { message: 'Logout successful' };
      }
}
