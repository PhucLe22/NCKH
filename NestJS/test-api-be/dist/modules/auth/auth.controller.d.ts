import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.create.dto';
import express from 'express';
import { UpdateUserDto } from '../user/dto/user.update.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.output';
import { UpdatePasswordDto } from './dto/auth.forgot';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly jwtService;
    constructor(authService: AuthService, userService: UserService, jwtService: JwtService);
    register(dto: CreateUserDto): Promise<import("../user/user.entity").User>;
    login(res: express.Response, dto: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        user: {
            access_token: string;
            user: {
                id: number;
                email: string;
                role: string;
            };
        };
    }>;
    updateById(body: UpdateUserDto, req: express.Request): Promise<AuthDto>;
    logout(res: express.Response): Promise<{
        message: string;
    }>;
    forgotPassword(email: string, req: express.Request): Promise<{
        message: string;
    }>;
    updatePassword(req: express.Request, dto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
}
