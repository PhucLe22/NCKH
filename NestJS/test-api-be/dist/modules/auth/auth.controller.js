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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_create_dto_1 = require("../user/dto/user.create.dto");
const express_1 = require("express");
const user_update_dto_1 = require("../user/dto/user.update.dto");
const user_service_1 = require("../user/user.service");
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
const jwt_1 = require("@nestjs/jwt");
let AuthController = class AuthController {
    constructor(authService, userService, jwtService) {
        this.authService = authService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const user = await this.authService.register(dto);
        return user;
    }
    async login(res, dto) {
        const user = await this.authService.login(dto.email, dto.password);
        res.cookie('token', user.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 15,
        });
        return { message: 'Login successful', user };
    }
    async updateById(body, req) {
        const token = req.cookies?.token;
        const decoded = this.jwtService.decode(token);
        const user = await this.userService.updateById(decoded.sub, body);
        const authDto = {
            email: user.email,
            username: user.username,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        return authDto;
    }
    async logout(res) {
        await this.authService.logout(res);
        return { message: 'Logout successful' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('update-profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, user_service_1.UserService, jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map