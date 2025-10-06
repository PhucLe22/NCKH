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
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const exam_repository_1 = require("./exam.repository");
const exam_entity_1 = require("./exam.entity");
const jwt_1 = require("@nestjs/jwt");
const teacher_repository_1 = require("../teacher/teacher.repository");
let ExamService = class ExamService {
    constructor(examRepository, jwtService, teacherRepository) {
        this.examRepository = examRepository;
        this.jwtService = jwtService;
        this.teacherRepository = teacherRepository;
    }
    async createExam(createExamDto, req) {
        const exam = new exam_entity_1.Exam();
        exam.title = createExamDto.title;
        exam.description = createExamDto.description || '';
        exam.start_time = createExamDto.start_time;
        exam.end_time = createExamDto.end_time;
        exam.duration = createExamDto.duration;
        const token = req.cookies?.token;
        const decoded = this.jwtService.decode(token);
        const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
        if (!teacher) {
            throw new Error('Teacher not found for this user');
        }
        exam.teacher = teacher;
        const createdExam = await this.examRepository.createExam(exam);
        return createdExam;
    }
};
exports.ExamService = ExamService;
exports.ExamService = ExamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exam_repository_1.ExamRepository,
        jwt_1.JwtService,
        teacher_repository_1.TeacherRepository])
], ExamService);
//# sourceMappingURL=exam.service.js.map