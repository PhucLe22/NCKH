import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByEmail(email: string): Promise<User | null>;
    findByName(username: string): Promise<User | null>;
    createUser(user: CreateUserDto): Promise<User>;
    findById(user_id: number): Promise<User | null>;
    deleteById(user_id: number): Promise<User | null>;
}
