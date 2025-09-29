import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
    constructor(private notificationRepository: NotificationRepository) {}

    getNotificationsByStudentId(studentId: number) {
        return this.notificationRepository.findByStudent(studentId);
    }
    createNotification(notification: Notification) {
        return this.notificationRepository.createNotification(notification);
    }
    markAsRead(notificationId: number) {
        return this.notificationRepository.markAsRead(notificationId);
    }
}
