"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("@nestjs/config");
const user_module_1 = require("./modules/user/user.module");
const course_module_1 = require("./modules/course/course.module");
const teacher_module_1 = require("./modules/teacher/teacher.module");
const student_module_1 = require("./modules/student/student.module");
const exam_module_1 = require("./modules/exam/exam.module");
const question_module_1 = require("./modules/question/question.module");
const option_module_1 = require("./modules/option/option.module");
const answer_module_1 = require("./modules/answer/answer.module");
const notification_module_1 = require("./modules/notification/notification.module");
const auth_module_1 = require("./modules/auth/auth.module");
const ai_agent_module_1 = require("./modules/ai_agent/ai_agent.module");
const admin_module_1 = require("./modules/admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_2.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                }),
            }),
            course_module_1.CourseModule,
            teacher_module_1.TeacherModule,
            student_module_1.StudentModule,
            exam_module_1.ExamModule,
            question_module_1.QuestionModule,
            option_module_1.OptionModule,
            answer_module_1.AnswerModule,
            notification_module_1.NotificationModule,
            auth_module_1.AuthModule,
            ai_agent_module_1.AiAgentModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map