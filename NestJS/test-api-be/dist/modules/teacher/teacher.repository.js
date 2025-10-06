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
exports.TeacherRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const teacher_entity_1 = require("./teacher.entity");
const user_entity_1 = require("../user/user.entity");
let TeacherRepository = class TeacherRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(teacher_entity_1.Teacher, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async addTeacher(data) {
        const teacher = new teacher_entity_1.Teacher();
        teacher.department = data.department;
        teacher.user = await this.dataSource
            .getRepository(user_entity_1.User)
            .findOne({ where: { user_id: parseInt(data.userId) } });
        teacher.createdAt = new Date();
        teacher.updatedAt = new Date();
        return this.save(teacher);
    }
    async getTeacherByUserId(userId) {
        return this.findOne({
            where: {
                user: { user_id: userId },
            },
            relations: ['user'],
        });
    }
    async getTeacherById(id) {
        return this.findOne({ where: { teacher_id: id } });
    }
};
exports.TeacherRepository = TeacherRepository;
exports.TeacherRepository = TeacherRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TeacherRepository);
//# sourceMappingURL=teacher.repository.js.map