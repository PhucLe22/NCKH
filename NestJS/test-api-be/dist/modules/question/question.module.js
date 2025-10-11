"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const question_controller_1 = require("./question.controller");
const user_repository_1 = require("../user/user.repository");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("./question.entity");
const question_repository_1 = require("./question.repository");
const exam_module_1 = require("../exam/exam.module");
let QuestionModule = class QuestionModule {
};
exports.QuestionModule = QuestionModule;
exports.QuestionModule = QuestionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([question_entity_1.Question]),
            exam_module_1.ExamModule,
        ],
        providers: [
            question_service_1.QuestionService,
            user_repository_1.UserRepository,
            question_repository_1.QuestionRepository,
        ],
        controllers: [question_controller_1.QuestionController],
        exports: [question_service_1.QuestionService],
    })
], QuestionModule);
//# sourceMappingURL=question.module.js.map