import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findByName(username: string): Promise<User | null> {
    return this.findOne({ where: { username } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.save(user);
  }
  async findById(user_id: number): Promise<User | null> {
    if (!user_id || isNaN(Number(user_id))) {
      throw new Error('Invalid user ID');
    }
    return this.findOne({ where: { user_id: user_id } });
  }
  async deleteById(user_id: number): Promise<User | null> {
    const user = await this.findOne({ where: { user_id: user_id } });
    if (!user) return null; 
    await this.remove(user); 
    return user; 
  }
}
