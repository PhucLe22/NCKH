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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const question_repository_1 = require("./question.repository");
const exam_repository_1 = require("../exam/exam.repository");
let QuestionService = class QuestionService {
    constructor(questionRepository, examRepository) {
        this.questionRepository = questionRepository;
        this.examRepository = examRepository;
    }
    async saveQuestions(examId, questions) {
        const exam = await this.examRepository.findOne({ where: { exam_id: examId } });
        if (!exam)
            throw new Error('Exam not found');
        const entities = questions.map((q) => this.questionRepository.create({
            content: q.question_text,
            type: q.type,
            score: q.score,
            exam,
        }));
        return await this.questionRepository.save(entities);
    }
    async findQuestionByExamId(exam_id) {
        return this.questionRepository.findQuestionByExamId(exam_id);
    }
    async deleteQuestionByExamId(exam_id) {
        return this.questionRepository.deleteQuestionByExamId(exam_id);
    }
    async findAllQuestions() {
        return this.questionRepository.findAll();
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_repository_1.QuestionRepository,
        exam_repository_1.ExamRepository])
], QuestionService);
//# sourceMappingURL=question.service.js.map