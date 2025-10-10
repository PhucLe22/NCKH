"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamModule = void 0;
const common_1 = require("@nestjs/common");
const exam_service_1 = require("./exam.service");
const exam_controller_1 = require("./exam.controller");
const exam_repository_1 = require("./exam.repository");
const typeorm_1 = require("@nestjs/typeorm");
const exam_entity_1 = require("./exam.entity");
const teacher_repository_1 = require("../teacher/teacher.repository");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("../auth/auth.module");
const student_repository_1 = require("../student/student.repository");
let ExamModule = class ExamModule {
};
exports.ExamModule = ExamModule;
exports.ExamModule = ExamModule = __decorate([
    (0, common_1.Module)({
        providers: [
            exam_service_1.ExamService,
            exam_repository_1.ExamRepository,
            teacher_repository_1.TeacherRepository,
            jwt_1.JwtService,
            auth_module_1.AuthModule,
            student_repository_1.StudentRepository,
        ],
        controllers: [exam_controller_1.ExamController],
        imports: [typeorm_1.TypeOrmModule.forFeature([exam_entity_1.Exam])],
        exports: [exam_service_1.ExamService],
    })
], ExamModule);
//# sourceMappingURL=exam.module.js.map