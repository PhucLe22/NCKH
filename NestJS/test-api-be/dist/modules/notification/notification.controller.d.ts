import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    getNotifications(studentId: number): Promise<Notification[]>;
    createNotification(notification: Notification): Promise<import("typeorm").InsertResult>;
    markAsRead(id: number): Promise<import("typeorm").UpdateResult>;
}
