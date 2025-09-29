import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import express from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    logout(res: express.Response): Promise<{
        message: string;
    }>;
}
