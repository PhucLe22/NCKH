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
exports.ExamRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const exam_entity_1 = require("./exam.entity");
let ExamRepository = class ExamRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(exam_entity_1.Exam, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createExam(exam) {
        return this.save(exam);
    }
    async findAll() {
        return this.find({
            relations: ['questions'],
        });
    }
    async findExamById(exam_id) {
        return this.findOne({
            where: { exam_id },
            relations: ['teacher'],
        });
    }
    async updateExam(exam_id, UpdateExamDto) {
        return this.update({ exam_id }, UpdateExamDto);
    }
    async deleteExam(exam_id) {
        return this.delete({ exam_id });
    }
    async findTeacherIdByUserId(user_id) {
        const result = await this.createQueryBuilder('exam')
            .leftJoinAndSelect('exam.teacher', 'teacher')
            .where('teacher.user_id = :user_id', { user_id })
            .select('teacher.teacher_id')
            .getRawOne();
        return result ? result.teacher_id : null;
    }
};
exports.ExamRepository = ExamRepository;
exports.ExamRepository = ExamRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ExamRepository);
//# sourceMappingURL=exam.repository.js.map