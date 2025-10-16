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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_repository_1 = require("./student.repository");
const user_repository_1 = require("../user/user.repository");
const exam_repository_1 = require("../exam/exam.repository");
const common_2 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const common_3 = require("@nestjs/common");
let StudentService = class StudentService {
    constructor(studentRepository, userRepository, examRepository, jwtService) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.examRepository = examRepository;
        this.jwtService = jwtService;
    }
    async joinExam(req, examId, examCode) {
        const token = req.cookies?.token;
        if (!token)
            throw new common_3.UnauthorizedException('Missing authentication token!');
        const decoded = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET,
        });
        const userId = decoded.sub;
        const user = await this.userRepository.findOneBy({ user_id: userId });
        if (!user)
            throw new common_2.NotFoundException('User not found');
        const exam = await this.examRepository.findOneBy({ exam_id: examId });
        if (!exam)
            throw new common_2.NotFoundException('Exam not found');
        const existing = await this.studentRepository.findByStudentAndExam(userId, examId);
        if (existing)
            throw new common_2.BadRequestException('User already joined this exam');
        if (exam.status === 'private' && exam.code !== examCode) {
            throw new common_2.BadRequestException('Invalid exam code');
        }
        const student = await this.studentRepository.createByStudentAndExam(userId, examId);
        const savedStudent = await this.studentRepository.save(student);
        return savedStudent;
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_repository_1.StudentRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(exam_repository_1.ExamRepository)),
    __metadata("design:paramtypes", [student_repository_1.StudentRepository,
        user_repository_1.UserRepository,
        exam_repository_1.ExamRepository,
        jwt_1.JwtService])
], StudentService);
//# sourceMappingURL=student.service.js.map