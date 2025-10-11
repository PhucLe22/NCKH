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
exports.AuthService = void 0;
const auth_repository_1 = require("./auth.repository");
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user/user.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const nodemailer = require("nodemailer");
let AuthService = class AuthService {
    constructor(authRepository, userRepository, jwtService) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const hash = await bcrypt.hash(dto.password, 10);
        dto.password = hash;
        return this.userRepository.createUser(dto);
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid password');
        const payload = { sub: user.user_id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '60m',
        });
        return {
            access_token: token,
            user: { id: user.user_id, email: user.email, role: user.role },
        };
    }
    async logout(res) {
        res.clearCookie('token');
        return { message: 'Logout successful' };
    }
    async sendForgotPasswordEmail(req, email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            return;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.OTP_EMAIL,
                pass: process.env.OTP_PASSWORD,
            },
        });
        const mailOptions = {
            from: '"OnlineTestApp" <...04@gmail.com>',
            to: email,
            subject: 'Your OTP for password reset',
            html: `<p>Your OTP is: <b>${otp}</b></p><p>Expires in 5 minutes.</p>`,
        };
        await transporter.sendMail(mailOptions);
        req.session.otp = otp;
        req.session.email = email;
        req.session.otpExpires = Date.now() + 5 * 60 * 1000;
    }
    async updatePassword(req, email, otp, newPassword) {
        try {
            if (!req.session.email || !req.session.otp) {
                throw new common_1.UnauthorizedException('Session expired or OTP not requested');
            }
            if (req.session.email !== email) {
                throw new common_1.UnauthorizedException('Email does not match OTP session');
            }
            if (req.session.otp !== otp) {
                throw new common_1.UnauthorizedException('Invalid OTP');
            }
            if (Date.now() > req.session.otpExpires) {
                throw new common_1.UnauthorizedException('OTP expired');
            }
            const user = await this.userRepository.findByEmail(email);
            if (!user)
                throw new common_1.UnauthorizedException('User not found');
            const hash = await bcrypt.hash(newPassword, 10);
            await this.authRepository.updatePassword(user.user_id, hash);
            req.session.destroy(() => { });
            return { message: 'Password updated successfully' };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid OTP');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map