
import { Admin } from "./admin.entity";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateAdminDto } from "./dto/admin.create.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AdminRepository extends Repository<Admin> {
    constructor(private dataSource: DataSource, private configService: ConfigService) {
        super(Admin, dataSource.createEntityManager());
    }

    async createAdmin(admin: CreateAdminDto): Promise<Admin> {
        return this.save(admin);
    }
    
    async findAdminByEmail(email: string): Promise<Admin> {
        return this.findOne({ where: { email } });
    }

    async deleteAdmin(id: number, adminCode: string): Promise<void> {
        if(adminCode !== this.configService.get('ADMIN_SECURITY')) {
            throw new Error('Invalid admin security code');
        }
        await this.delete(id);
    }
}
