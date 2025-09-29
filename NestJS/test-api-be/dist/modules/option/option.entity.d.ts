import { Question } from '../question/question.entity';
export declare class Option {
    option_id: number;
    content: string;
    is_correct: boolean;
    question: Question;
}
