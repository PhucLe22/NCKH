import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUser.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    register(dto: CreateUserDto): Promise<import("../user/user.entity").User>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: string;
        };
    }>;
}
