import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from '../user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET || 'secretKey',
    signOptions: { expiresIn: '1h' },
  }),
  UserModule,
],
  providers: [
    JwtStrategy,
    AuthService,
    AuthRepository,
    UserRepository,
    JwtService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
