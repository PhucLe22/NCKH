import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import express from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: CreateUserDto) {
      const user = await this.authService.register(dto);
      return user;
    }

    @Post('login')
    async login(@Res({ passthrough: true }) res: express.Response, @Body() dto: { email: string, password: string }) {
      const user = await this.authService.login(dto.email, dto.password);
    
      res.cookie('token', user.access_token, {
        httpOnly: true,  
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 1000 * 60 * 15, 
      });
    
      return { message: 'Login successful', user };
    }
    
    @Post('logout')
    async logout(@Res({ passthrough: true }) res: express.Response) {
      res.clearCookie('token');
      return { message: 'Logout successful' };
    }   
}
