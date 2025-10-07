"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAgentService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AiAgentService = class AiAgentService {
    constructor() {
        this.aiUrl = "http://python-ai:8000/api";
    }
    async generateQuestions(text) {
        const res = await axios_1.default.post(`${this.aiUrl}/generate-questions`, { text });
        return res.data;
    }
    async reviewExam(examId) {
        const res = await axios_1.default.post(`${this.aiUrl}/review-exam`, { examId });
        return res.data;
    }
};
exports.AiAgentService = AiAgentService;
exports.AiAgentService = AiAgentService = __decorate([
    (0, common_1.Injectable)()
], AiAgentService);
//# sourceMappingURL=ai_agent.service.js.map