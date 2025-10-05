import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.update.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./user.entity").User[]>;
    findByEmail(body: {
        email: string;
    }): Promise<{
        user_id: number;
        username: string;
        email: string;
    }>;
    findByName(body: {
        username: string;
    }): Promise<{
        user_id: number;
        username: string;
        email: string;
    }>;
    findById(id: number): Promise<{
        user_id: number;
        username: string;
        email: string;
    }>;
    deleteById(id: number): Promise<string>;
    getProfile(id: number): Promise<{
        userId: number;
        username: string;
        email: string;
        role: string;
    }>;
    updateById(id: number, body: UpdateUserDto): Promise<import("./user.entity").User>;
}
