"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const teacherRequest_entity_1 = require("./teacherRequest.entity");
const teacher_entity_1 = require("./teacher.entity");
const user_entity_1 = require("../user/user.entity");
const bcrypt = require("bcryptjs");
let TeacherService = class TeacherService {
    constructor(teacherRequestRepo, userRepo, teacherRepo, dataSource) {
        this.teacherRequestRepo = teacherRequestRepo;
        this.userRepo = userRepo;
        this.teacherRepo = teacherRepo;
        this.dataSource = dataSource;
    }
    async requestRegister(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const request = this.teacherRequestRepo.create({
            username: dto.username,
            password: hashedPassword,
            email: dto.email,
        });
        return await this.teacherRequestRepo.save(request);
    }
    async approveRequest(id) {
        return await this.dataSource.transaction(async (manager) => {
            const req = await manager.findOne(teacherRequest_entity_1.TeacherRequest, { where: { id } });
            if (!req)
                throw new Error('Request not found');
            if (req.status !== 'pending')
                throw new Error('Request already processed');
            const user = manager.create(user_entity_1.User, {
                username: req.username,
                password: req.password,
                email: req.email,
                role: 'teacher',
                status: 'active',
            });
            const savedUser = await manager.save(user_entity_1.User, user);
            const teacher = manager.create(teacher_entity_1.Teacher, {
                department: 'General',
                user: savedUser,
            });
            const savedTeacher = await manager.save(teacher_entity_1.Teacher, teacher);
            req.status = 'approved';
            await manager.save(teacherRequest_entity_1.TeacherRequest, req);
            return savedTeacher;
        });
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacherRequest_entity_1.TeacherRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map