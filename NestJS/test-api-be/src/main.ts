import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const serverPort = configService.get<number>('SERVER_PORT') || 3001;
  const clientPort = configService.get<number>('CLIENT_PORT') || 5173;

  app.use(cookieParser());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my-secret-key', 
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 5 * 60 * 1000, 
        httpOnly: true,
        secure: false, 
      },
    }),
  );

  app.enableCors({
    origin: `http://localhost:${clientPort}`, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation with Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs.html', app, document);

  await app.listen(serverPort);
  console.log(`App is running on http://localhost:${serverPort}`);
}
bootstrap();


// router --> http localhost GET --> logic (controller) --> view (response) API
// module --> repos --> services --> controllers