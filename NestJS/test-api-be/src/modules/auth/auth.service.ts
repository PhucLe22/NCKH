import { AuthRepository } from './auth.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/user.create.dto';
import * as nodemailer from 'nodemailer';
import { Request, Response } from 'express';

declare module 'express-session' {
  interface SessionData {
    otp?: string;
    email?: string;
    otpExpires?: number;
  }
}
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async register(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    dto.password = hash;
    return this.userRepository.createUser(dto);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid password');

    const payload = { sub: user.user_id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m',
    });

    return {
      access_token: token,
      user: { id: user.user_id, email: user.email, role: user.role },
    };
  }

  async logout(res: Response) {
    res.clearCookie('token');
    return { message: 'Logout successful' };
  }

  async sendForgotPasswordEmail(req: Request, email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.OTP_EMAIL,
        pass: process.env.OTP_PASSWORD,
      },
    });

    const mailOptions =
    {
      from: '"OnlineTestApp" <...04@gmail.com>',
      to: email,
      subject: 'Your OTP for password reset',
      html: `<p>Your OTP is: <b>${otp}</b></p><p>Expires in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    req.session.otp = otp;
    req.session.email = email;
    req.session.otpExpires = Date.now() + 5 * 60 * 1000;
  }

  async updatePassword(req: Request, email: string, otp: string, newPassword: string): Promise<{ message: string }> {
    try {
      if (!req.session.email || !req.session.otp) {
        throw new UnauthorizedException('Session expired or OTP not requested');
      }

      if (req.session.email !== email) {
        throw new UnauthorizedException('Email does not match OTP session');
      }

      if (req.session.otp !== otp) {
        throw new UnauthorizedException('Invalid OTP');
      }

      if (Date.now() > req.session.otpExpires) {
        throw new UnauthorizedException('OTP expired');
      }

      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new UnauthorizedException('User not found');

      const hash = await bcrypt.hash(newPassword, 10);
      await this.authRepository.updatePassword(user.user_id, hash);

      req.session.destroy(() => { });

      return { message: 'Password updated successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid OTP');
    }
  }
}