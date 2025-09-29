"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cookieParser = require('cookie-parser');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const serverPort = configService.get('SERVER_PORT') || 3001;
    const clientPort = configService.get('CLIENT_PORT') || 5173;
    app.use(cookieParser());
    app.enableCors({
        origin: `http://localhost:${clientPort}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('My API')
        .setDescription('API documentation with Swagger')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs.html', app, document);
    await app.listen(serverPort);
    console.log(`App is running on http://localhost:${serverPort}`);
}
bootstrap();
//# sourceMappingURL=main.js.map