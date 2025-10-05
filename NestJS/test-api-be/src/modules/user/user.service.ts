import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Param, BadRequestException, Body } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.update.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    
    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    async findByName(username: string): Promise<User | null> {
        return this.userRepository.findByName(username);
    }
    async findById(id: number): Promise<User | null> {
        if (!id || isNaN(id)) {
            throw new BadRequestException('Invalid user ID');
        }
        return this.userRepository.findById(id);
    }
    async deleteById(@Param('id') id: number): Promise<User | null> {
        return this.userRepository.deleteById(id);
    }
    async updateById(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<User | null> {
        return this.userRepository.updateById(id, body);
    }
}
