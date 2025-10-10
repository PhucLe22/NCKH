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
const common_2 = require("@nestjs/common");
const teacher_repository_1 = require("../teacher/teacher.repository");
const bcrypt = require("bcrypt");
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
        exam.code = createExamDto.code;
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
    async findAll() {
        const exams = await this.examRepository.findAll();
        const resList = [];
        for (const exam of exams) {
            if (exam.status != 'private') {
                resList.push({
                    exam_id: exam.exam_id,
                    title: exam.title,
                    description: exam.description,
                    start_time: exam.start_time,
                    end_time: exam.end_time,
                    duration: exam.duration,
                    status: exam.status,
                    createdAt: exam.createdAt,
                    updatedAt: exam.updatedAt,
                });
            }
        }
        return resList;
    }
    async updateExamById(exam_id, UpdateExamDto, req) {
        const token = req.cookies?.token;
        const decoded = this.jwtService.decode(token);
        const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
        if (!teacher) {
            throw new common_2.NotFoundException('Teacher not found for this user!');
        }
        const examToUpdate = await this.examRepository.findExamById(exam_id);
        if (!examToUpdate) {
            throw new common_2.NotFoundException(`Exam not found with ID: ${exam_id}!`);
        }
        if (examToUpdate.teacher.teacher_id !== teacher.teacher_id) {
            throw new common_2.ForbiddenException('You do not have permission to edit this exam!');
        }
        await this.examRepository.updateExam(exam_id, UpdateExamDto);
        return { message: 'Update exam successfully!' };
    }
    async deleteExamById(exam_id, req) {
        const token = req.cookies?.token;
        const decoded = this.jwtService.decode(token);
        const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
        if (!teacher) {
            throw new common_2.NotFoundException('Teacher not found for this user!');
        }
        const examToDelete = await this.examRepository.findExamById(exam_id);
        if (!examToDelete) {
            throw new common_2.NotFoundException(`Exam not found with ID: ${exam_id}!`);
        }
        if (examToDelete.teacher.teacher_id !== teacher.teacher_id) {
            throw new common_2.ForbiddenException('You do not have permission to delete this exam!');
        }
        await this.examRepository.deleteExam(exam_id);
        return { message: 'Delete exam successfully!' };
    }
    async verifyExamCode(exam_id, VerifyExamCodeDto) {
        const exam = await this.examRepository.findExamById(exam_id);
        if (!exam) {
            throw new common_2.NotFoundException(`Exam not found with ID: ${exam_id}!`);
        }
        const isValid = await bcrypt.compare(VerifyExamCodeDto.code, exam.code);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid exam code!');
        }
        return { message: 'Exam code is valid!' };
    }
    async findExamsByTeacher(req) {
        const token = req.cookies?.token;
        if (!token)
            throw new common_1.UnauthorizedException('Missing authentication token!');
        const decoded = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET,
        });
        const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
        if (!teacher) {
            throw new common_2.NotFoundException('Teacher not found for this user!');
        }
        const exams = await this.examRepository.find({
            where: { teacher: { teacher_id: teacher.teacher_id } },
            relations: ['teacher', 'questions'],
        });
        if (!exams.length) {
            throw new common_2.NotFoundException('No exams found for this teacher!');
        }
        return exams;
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