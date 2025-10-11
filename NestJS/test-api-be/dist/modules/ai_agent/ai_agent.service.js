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
let AIService = class AIService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async generateQuestionsFromFile(file) {
        if (!file?.buffer) {
            throw new common_1.BadRequestException('Invalid file provided');
        }
        try {
            const formData = new FormData();
            formData.append('file', file.buffer, {
                filename: file.originalname || 'uploaded_file',
                contentType: file.mimetype,
                knownLength: file.size
            });
            const baseUrl = this.configService.get('AI_AGENT_URL', 'http://localhost:8000');
            const url = `${baseUrl.replace(/\/+$/, '')}/api/generate-questions-from-file`;
            console.log('📡 Sending request to AI service:', url);
            const headers = formData.getHeaders();
            const response = await new Promise((resolve, reject) => {
                formData.submit({
                    host: new URL(url).hostname,
                    port: new URL(url).port || (url.startsWith('https') ? 443 : 80),
                    path: new URL(url).pathname,
                    method: 'POST',
                    headers: headers,
                    protocol: url.startsWith('https') ? 'https:' : 'http:'
                }, (err, res) => {
                    if (err)
                        return reject(err);
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => {
                        try {
                            const responseData = JSON.parse(data);
                            resolve({
                                ...responseData
                            });
                        }
                        catch (e) {
                            reject(new Error(`Failed to parse response: ${e.message}`));
                        }
                    });
                });
            });
            if (!response?.questions) {
                console.error('Empty or invalid response from AI service:', response);
                throw new Error('Empty response from AI service');
            }
            console.log('Received response from AI service');
            return {
                key_points: response.key_points,
                questions: response.questions
            };
        }
        catch (error) {
            console.error('❌ Error calling AI service:', error);
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