import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    findAll(): import("./admin.entity").Admin[];
    create(dto: CreateAdminDto): import("./admin.entity").Admin;
}
