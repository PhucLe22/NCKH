import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {Notification} from "../../modules/notification/notification.entity";

@Injectable()
export class NotificationRepository extends Repository<Notification> {
    constructor(private dataSource: DataSource) {
        super(Notification, dataSource.createEntityManager());
    }
    async findByStudent(studentId: number) {
        return this.createQueryBuilder('notification')
            .leftJoinAndSelect('notification.student', 'student')
            .where('student.id = :studentId', { studentId })
            .orderBy('notification.createdAt', 'DESC')
            .getMany();
    }
    async markAsRead(notificationId: number) {
        return this.createQueryBuilder('notification')
            .update({ isRead: true })
            .where('notification.id = :notificationId', { notificationId })
            .execute();
    }
    async createNotification(notification: Notification) {
        return this.createQueryBuilder('notification')
            .insert()
            .values(notification)
            .execute();
    }
}
