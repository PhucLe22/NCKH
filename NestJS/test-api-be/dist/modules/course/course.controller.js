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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const common_4 = require("@nestjs/common");
const common_5 = require("@nestjs/common");
const common_6 = require("@nestjs/common");
const common_7 = require("@nestjs/common");
const course_dto_1 = require("./course.dto");
const course_dto_2 = require("./course.dto");
const common_8 = require("@nestjs/common");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    findAll() {
        return this.courseService.findAll();
    }
    findById(id) {
        return this.courseService.findById(id);
    }
    deleteById(id) {
        return this.courseService.deleteById(id);
    }
    async updateCourse(id, body) {
        const course = await this.courseService.updateCourse(id, body);
        if (!course) {
            throw new common_8.NotFoundException('Course not found');
        }
        return `Update course successfully`;
    }
    async createCourse(body) {
        const course = await this.courseService.createCourse(body);
        return `Create course successfully ${course.name}`;
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_2.Get)(':id'),
    __param(0, (0, common_3.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findById", null);
__decorate([
    (0, common_4.Delete)('delete/:id'),
    __param(0, (0, common_3.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "deleteById", null);
__decorate([
    (0, common_7.Put)('update/:id'),
    __param(0, (0, common_3.Param)('id')),
    __param(1, (0, common_6.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, common_5.Post)('create'),
    __param(0, (0, common_6.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_dto_2.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map