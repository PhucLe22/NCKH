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
exports.CourseRepository = void 0;
const common_1 = require("@nestjs/common");
const course_entity_1 = require("./course.entity");
const typeorm_1 = require("typeorm");
let CourseRepository = class CourseRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(course_entity_1.Course, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findById(id) {
        return this.findOne({ where: { id } });
    }
    async deleteById(id) {
        const course = await this.findOne({ where: { id } });
        if (!course)
            return null;
        await this.remove(course);
        return course;
    }
    async createCourse(courseData) {
        return this.save(courseData);
    }
    async updateCourse(id, courseData) {
        const courseUpdate = await this.findOne({ where: { id } });
        if (!courseUpdate)
            return null;
        await this.update(id, courseData);
        return courseUpdate;
    }
};
exports.CourseRepository = CourseRepository;
exports.CourseRepository = CourseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CourseRepository);
//# sourceMappingURL=course.repository.js.map