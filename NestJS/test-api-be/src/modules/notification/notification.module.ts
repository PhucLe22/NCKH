import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';

@Module({
  providers: [
    NotificationService,
    NotificationRepository
  ],
  controllers: [NotificationController],
  imports: [TypeOrmModule.forFeature([Notification])]
})
export class NotificationModule {}
