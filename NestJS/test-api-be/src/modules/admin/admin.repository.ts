import { Admin } from "./admin.entity";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateAdminDto } from "./dto/admin.create.dto";

@Injectable()
export class AdminRepository extends Repository<Admin> {
    constructor(private dataSource: DataSource) {
        super(Admin, dataSource.createEntityManager());
    }
    async createAdmin(admin: CreateAdminDto): Promise<Admin> {
        return this.save(admin);
    }
}
