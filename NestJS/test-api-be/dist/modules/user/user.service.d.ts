import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/user.update.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByName(username: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    deleteById(id: number): Promise<User | null>;
    updateById(id: number, body: UpdateUserDto): Promise<User | null>;
}
