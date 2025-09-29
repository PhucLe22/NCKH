import { NotificationRepository } from './notification.repository';
import { Notification } from './notification.entity';
export declare class NotificationService {
    private notificationRepository;
    constructor(notificationRepository: NotificationRepository);
    getNotificationsByStudentId(studentId: number): Promise<Notification[]>;
    createNotification(notification: Notification): Promise<import("typeorm").InsertResult>;
    markAsRead(notificationId: number): Promise<import("typeorm").UpdateResult>;
}
