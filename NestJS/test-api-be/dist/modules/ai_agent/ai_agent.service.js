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
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const FormData = require("form-data");
const stream_1 = require("stream");
let AIService = class AIService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async generateQuestionsFromFile(file) {
        if (!file)
            throw new common_1.BadRequestException('File is required');
        const stream = new stream_1.Readable();
        stream.push(file.buffer);
        stream.push(null);
        const formData = new FormData();
        formData.append('file', stream, { filename: file.originalname });
        const baseUrl = this.configService.get('AI_AGENT_URL') || 'http://localhost:8000';
        if (!baseUrl)
            throw new Error('AI_AGENT_URL is not defined in .env');
        const url = `${baseUrl.replace(/\/+$/, '')}/api/generate-questions-from-file`;
        console.log('📡 Sending request to AI service:', url);
        try {
            const { data } = await this.httpService.axiosRef.post(url, formData, {
                headers: formData.getHeaders(),
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            });
            return data;
        }
        catch (error) {
            console.error('❌ Error calling AI service:', error.message);
            if (error.response) {
                console.error('Response:', error.response.data);
            }
            throw new Error(`AI service failed: ${error.message}`);
        }
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AIService);
//# sourceMappingURL=ai_agent.service.js.map