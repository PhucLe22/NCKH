import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../user/user.entity";


@Injectable()
export class AuthRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
    async updatePassword(user_id: number, hash: string): Promise<void> {
        if (!user_id || isNaN(Number(user_id))) {
          throw new Error('Invalid user ID');
        }
        await this.createQueryBuilder()
          .update(User)
          .set({ password: hash }) 
          .where('user_id = :user_id', { user_id })
          .execute();
      }
}