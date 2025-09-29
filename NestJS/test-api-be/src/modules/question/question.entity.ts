import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Exam } from "../exam/exam.entity";
import { Option } from "../option/option.entity";
import { Answer } from "../answer/answer.entity";

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  question_id: number;

  @Column()
  content: string;

  @Column()
  type: string;

  @Column()
  score: number;

  @ManyToOne(() => Exam, (exam) => exam.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @OneToMany(() => Option, (option) => option.question, { onDelete: 'CASCADE' })
  options: Option[];

  @OneToMany(() => Answer, (answer) => answer.question, { onDelete: 'CASCADE' })
  answers: Answer[];
}
