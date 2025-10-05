import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByEmail(email: string): Promise<User | null>;
    findByName(username: string): Promise<User | null>;
    createUser(user: CreateUserDto): Promise<User>;
    findById(user_id: number): Promise<User | null>;
    deleteById(user_id: number): Promise<User | null>;
    updateById(user_id: number, userbody: UpdateUserDto): Promise<User | null>;
}
