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
const question_entity_1 = require("../question/question.entity");
const option_entity_1 = require("../option/option.entity");
const answer_entity_1 = require("../answer/answer.entity");
const question_repository_1 = require("../question/question.repository");
const option_repositoy_1 = require("../option/option.repositoy");
const answer_repository_1 = require("../answer/answer.repository");
const teacher_entity_1 = require("../teacher/teacher.entity");
const student_entity_1 = require("../student/student.entity");
const ai_agent_service_1 = require("../ai_agent/ai_agent.service");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let ExamModule = class ExamModule {
};
exports.ExamModule = ExamModule;
exports.ExamModule = ExamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            axios_1.HttpModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([
                exam_entity_1.Exam,
                question_entity_1.Question,
                option_entity_1.Option,
                answer_entity_1.Answer,
                teacher_entity_1.Teacher,
                student_entity_1.Student,
            ]),
        ],
        controllers: [exam_controller_1.ExamController],
        providers: [
            exam_service_1.ExamService,
            exam_repository_1.ExamRepository,
            question_repository_1.QuestionRepository,
            option_repositoy_1.OptionRepository,
            answer_repository_1.AnswerRepository,
            teacher_repository_1.TeacherRepository,
            student_repository_1.StudentRepository,
            ai_agent_service_1.AIService,
            jwt_1.JwtService,
        ],
        exports: [exam_service_1.ExamService, exam_repository_1.ExamRepository],
    })
], ExamModule);
//# sourceMappingURL=exam.module.js.map