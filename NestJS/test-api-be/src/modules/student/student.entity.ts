import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
  } from 'typeorm';
  import { User } from '../user/user.entity';
  import { Exam } from '../exam/exam.entity';
  import { Notification } from '../notification/notification.entity';
  
  @Entity('students') // table name
  export class Student {
    @PrimaryGeneratedColumn()
    student_id: number;
  
    @Column()
    grade: string;
  
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToMany(() => Exam, (exam) => exam.students, { onDelete: 'CASCADE' })
    exams: Exam[];

    @OneToMany(() => Notification, (notification) => notification.student)
    notifications: Notification[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  