import { AuthRepository } from './auth.repository';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/user.create.dto';
import { Request, Response } from 'express';
declare module 'express-session' {
    interface SessionData {
        otp?: string;
        email?: string;
        otpExpires?: number;
    }
}
export declare class AuthService {
    private readonly authRepository;
    private readonly userRepository;
    private readonly jwtService;
    constructor(authRepository: AuthRepository, userRepository: UserRepository, jwtService: JwtService);
    register(dto: CreateUserDto): Promise<import("../user/user.entity").User>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: string;
        };
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    sendForgotPasswordEmail(req: Request, email: string): Promise<void>;
    updatePassword(req: Request, email: string, otp: string, newPassword: string): Promise<{
        message: string;
    }>;
}
