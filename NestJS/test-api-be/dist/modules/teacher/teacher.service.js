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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const teacher_repository_1 = require("./teacher.repository");
const user_repository_1 = require("../user/user.repository");
const bcrypt = require("bcrypt");
let TeacherService = class TeacherService {
    constructor(teacherRepository, userRepository) {
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
    }
    async createTeacher(body) {
        const role = 'teacher';
        const existingUser = await this.userRepository.findByEmail(body.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const newUser = await this.userRepository.createUser({
            username: body.username,
            email: body.email,
            password: hashedPassword,
            role: 'teacher',
        });
        const newTeacher = await this.teacherRepository.addTeacher({
            userId: newUser.user_id.toString(),
            department: body.department,
        });
        return {
            message: 'Teacher registered successfully',
            teacher: newTeacher,
        };
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [teacher_repository_1.TeacherRepository, user_repository_1.UserRepository])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map