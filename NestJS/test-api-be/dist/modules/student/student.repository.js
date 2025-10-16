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
exports.StudentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const student_entity_1 = require("./student.entity");
const user_entity_1 = require("../user/user.entity");
const exam_entity_1 = require("../exam/exam.entity");
let StudentRepository = class StudentRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(student_entity_1.Student, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findByStudentAndExam(userId, examId) {
        return this.createQueryBuilder('student')
            .leftJoinAndSelect('student.user', 'user')
            .leftJoinAndSelect('student.exams', 'exam')
            .where('student.user_id = :userId', { userId })
            .andWhere('exam.exam_id = :examId', { examId })
            .getOne();
    }
    async createByStudentAndExam(userId, examId) {
        const user = await this.dataSource.getRepository(user_entity_1.User).findOne({ where: { user_id: userId } });
        const exam = await this.dataSource.getRepository(exam_entity_1.Exam).findOne({ where: { exam_id: examId } });
        if (!user || !exam) {
            throw new Error('User or Exam not found');
        }
        const student = this.create({
            user: user,
            grade: ''
        });
        const savedStudent = await this.save(student);
        const studentWithExams = await this.findOne({
            where: { student_id: savedStudent.student_id },
            relations: ['exams']
        });
        if (studentWithExams) {
            studentWithExams.exams = [exam];
            return this.save(studentWithExams);
        }
        return savedStudent;
    }
};
exports.StudentRepository = StudentRepository;
exports.StudentRepository = StudentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], StudentRepository);
//# sourceMappingURL=student.repository.js.map