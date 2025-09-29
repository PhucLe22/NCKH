import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../question/question.entity";
import { Option } from "../option/option.entity";
import { JoinColumn } from "typeorm";

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE' })
  question: Question;

  @Column()
  studentId: number;

  @ManyToOne(() => Option, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'option_id' })
  option: Option;


  @Column({ nullable: true })
  text: string; 
}

