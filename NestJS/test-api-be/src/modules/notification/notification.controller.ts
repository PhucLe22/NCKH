import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) {}

    @Get()
    getNotifications(@Query('studentId') studentId: number) {
        return this.notificationService.getNotificationsByStudentId(studentId);
    }
    
    @Post()
    createNotification(@Body() notification: Notification) {
        return this.notificationService.createNotification(notification);
    }

    @Patch(':id/read')
    markAsRead(@Param('id') id: number) {
      return this.notificationService.markAsRead(+id);
    }
}
