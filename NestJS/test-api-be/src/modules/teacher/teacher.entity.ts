import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { User } from '../user/user.entity';
  import { Exam } from '../exam/exam.entity';
  
  @Entity('teachers') 
  export class Teacher {
    @PrimaryGeneratedColumn()
    teacher_id: number;
  
    @Column()
    department: string;
  
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' }) 
    user: User;

    @OneToMany(() => Exam, (exam) => exam.teacher)
    exams: Exam[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  