import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
export class Option {
    @PrimaryGeneratedColumn()
    option_id: number;

    @Column()
    content: string;

    @Column()
    is_correct: boolean;

    @ManyToOne(() => Question, (question) => question.options, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'question_id' })
    question: Question;
}
