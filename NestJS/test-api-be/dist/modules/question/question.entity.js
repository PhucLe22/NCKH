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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const exam_entity_1 = require("../exam/exam.entity");
const option_entity_1 = require("../option/option.entity");
const answer_entity_1 = require("../answer/answer.entity");
let Question = class Question {
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Question.prototype, "question_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Question.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Question.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exam_entity_1.Exam, (exam) => exam.questions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'exam_id' }),
    __metadata("design:type", exam_entity_1.Exam)
], Question.prototype, "exam", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => option_entity_1.Option, (option) => option.question, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.Answer, (answer) => answer.question, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)('questions')
], Question);
//# sourceMappingURL=question.entity.js.map