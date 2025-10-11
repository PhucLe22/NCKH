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
exports.AiAgentController = void 0;
const common_1 = require("@nestjs/common");
const ai_agent_service_1 = require("./ai_agent.service");
let AiAgentController = class AiAgentController {
    constructor(aiAgentService) {
        this.aiAgentService = aiAgentService;
    }
};
exports.AiAgentController = AiAgentController;
exports.AiAgentController = AiAgentController = __decorate([
    (0, common_1.Controller)('ai-agent'),
    __metadata("design:paramtypes", [ai_agent_service_1.AIService])
], AiAgentController);
//# sourceMappingURL=ai_agent.controller.js.map