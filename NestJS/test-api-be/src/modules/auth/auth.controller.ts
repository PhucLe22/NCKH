import { Body, Controller, Post, Res, Put, UseGuards, Req, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.create.dto';
import express from 'express';
import { UpdateUserDto } from '../user/dto/user.update.dto';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.output';
import { UpdatePasswordDto } from './dto/auth.forgot';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService, private readonly jwtService: JwtService) {}

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

    @UseGuards(JwtAuthGuard)
    @Put('update-profile')
    async updateById(@Body() body: UpdateUserDto, @Req() req: express.Request) {
      const token = req.cookies?.token;
      const decoded: any = this.jwtService.decode(token);
      const user = await this.userService.updateById(decoded.sub, body);
      const authDto: AuthDto = {
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return authDto;
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Res({ passthrough: true }) res: express.Response) {
      await this.authService.logout(res);
      return { message: 'Logout successful' };
    }

    @Post('forgotPassword')
    async forgotPassword(@Body('email') email: string, @Req() req: express.Request) {
    try {
      await this.authService.sendForgotPasswordEmail(req, email);
      return { message: 'OTP has been sent to your email for confirmation.' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Send mail failed');
    }
  }

  @Post('updatePassword')
    async updatePassword(@Req() req: express.Request, @Body() dto: UpdatePasswordDto) {
      try {
        await this.authService.updatePassword(req, dto.email, dto.otp, dto.newPassword);
        return { message: 'Password updated successfully.' };
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Update password failed');
      }
  }
}
