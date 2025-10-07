  import { Body, Controller, Post, Res, Req,  InternalServerErrorException,BadRequestException  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { CreateUserDto } from '../user/dto/createUser.dto';
  import express from 'express';
import { UpdatePasswordDto } from './auth.dto';
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

      @Post('forgotPassword')
      async forgotPassword(@Body('email') email: string, @Req() req: express.Request) {
      try {
        await this.authService.sendForgotPasswordEmail(req, email);
        return { message: 'If this email exists, a reset link has been sent.' };
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
