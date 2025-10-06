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
exports.QuestionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
let QuestionRepository = class QuestionRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(question_entity_1.Question, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createQuestion(question) {
        return this.save(question);
    }
    async findAll() {
        return this.find();
    }
    async deleteById(id) {
        return this.delete(id);
    }
    async updateById(id, question) {
        return this.update(id, question);
    }
};
exports.QuestionRepository = QuestionRepository;
exports.QuestionRepository = QuestionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], QuestionRepository);
//# sourceMappingURL=question.repository.js.map