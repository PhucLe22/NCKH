import { DataSource, Repository } from "typeorm";
import { Notification } from "../../modules/notification/notification.entity";
export declare class NotificationRepository extends Repository<Notification> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByStudent(studentId: number): Promise<Notification[]>;
    markAsRead(notificationId: number): Promise<import("typeorm").UpdateResult>;
    createNotification(notification: Notification): Promise<import("typeorm").InsertResult>;
}
