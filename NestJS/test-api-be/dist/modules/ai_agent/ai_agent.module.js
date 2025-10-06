"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAgentModule = void 0;
const common_1 = require("@nestjs/common");
const ai_agent_service_1 = require("./ai_agent.service");
const ai_agent_controller_1 = require("./ai_agent.controller");
const question_repository_1 = require("../question/question.repository");
const exam_repository_1 = require("../exam/exam.repository");
const question_entity_1 = require("../question/question.entity");
const exam_entity_1 = require("../exam/exam.entity");
const typeorm_1 = require("@nestjs/typeorm");
let AiAgentModule = class AiAgentModule {
};
exports.AiAgentModule = AiAgentModule;
exports.AiAgentModule = AiAgentModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: "AI_AGENT_URL",
                useValue: "http://localhost:8000/api"
            },
            ai_agent_service_1.AiAgentService,
            question_repository_1.QuestionRepository,
            exam_repository_1.ExamRepository
        ],
        controllers: [ai_agent_controller_1.AiAgentController],
        imports: [typeorm_1.TypeOrmModule.forFeature([question_entity_1.Question, exam_entity_1.Exam])],
        exports: [ai_agent_service_1.AiAgentService]
    })
], AiAgentModule);
//# sourceMappingURL=ai_agent.module.js.map