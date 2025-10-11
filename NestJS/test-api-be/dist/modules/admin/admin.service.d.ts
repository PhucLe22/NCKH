import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/createAdmin.dto';
export declare class AdminService {
    private admins;
    findAll(): Admin[];
    create(dto: CreateAdminDto): Admin;
}
