import { DataSource, Repository } from "typeorm";
import { User } from "../user/user.entity";
export declare class AuthRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
}
