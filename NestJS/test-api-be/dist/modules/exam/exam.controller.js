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
exports.ExamController = void 0;
const common_1 = require("@nestjs/common");
const exam_service_1 = require("./exam.service");
const exam_create_dto_1 = require("./dto/exam.create.dto");
const exam_update_dto_1 = require("./dto/exam.update.dto");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
const common_3 = require("@nestjs/common");
const exam_verify_dto_1 = require("./dto/exam.verify.dto");
const platform_express_1 = require("@nestjs/platform-express");
let ExamController = class ExamController {
    constructor(examService) {
        this.examService = examService;
    }
    async createExam(createExamDto, req) {
        return await this.examService.createExam(createExamDto, req);
    }
    async findExams(req) {
        return await this.examService.findAll();
    }
    async updateExam(id, updateExamDto, req) {
        return await this.examService.updateExamById(id, updateExamDto, req);
    }
    async deleteExam(id, req) {
        return await this.examService.deleteExamById(id, req);
    }
    async verifyExamCode(id, verifyExamCodeDto) {
        return await this.examService.verifyExamCode(id, verifyExamCodeDto);
    }
    async findExamsByTeacher(req) {
        return await this.examService.findExamsByTeacher(req);
    }
    async createExamFromAIFile(examId, file, req) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        return await this.examService.createExamFromAIFile(examId, file, req);
    }
};
exports.ExamController = ExamController;
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_3.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_create_dto_1.CreateExamDto, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "createExam", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_3.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "findExams", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_3.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, exam_update_dto_1.UpdateExamDto, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "updateExam", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_3.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "deleteExam", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/:id/verify-code'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, exam_verify_dto_1.VerifyExamCodeDto]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "verifyExamCode", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/teacher/me'),
    __param(0, (0, common_3.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "findExamsByTeacher", null);
__decorate([
    (0, common_1.Post)('/upload-file/:examId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('examId')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_3.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "createExamFromAIFile", null);
exports.ExamController = ExamController = __decorate([
    (0, common_1.Controller)('exam'),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
//# sourceMappingURL=exam.controller.js.map