import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Teacher } from '../teacher/teacher.entity';
import { Student } from '../student/student.entity';
import { Question } from '../question/question.entity';
import { Notification } from '../notification/notification.entity';
import * as bcrypt from 'bcrypt';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn()
  exam_id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ type: 'int' })
  duration: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.exams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @ManyToMany(() => Student, (student) => student.exams, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'exam_student', joinColumn: { name: 'exam_id' }, inverseJoinColumn: { name: 'student_id' } })
  students: Student[];

  @OneToMany(() => Question, (question) => question.exam)
  questions: Question[];

  @Column({ type: 'text', nullable: true })
  key_points: string;

  @OneToMany(() => Notification, (notification) => notification.exam)
  notifications: Notification[];

  @Column({ name: 'code', default: null })
  code: string;

  @Column({ name: 'status', default: 'public' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
