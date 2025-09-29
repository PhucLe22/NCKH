import { Exam } from "../exam/exam.entity";
import { Option } from "../option/option.entity";
import { Answer } from "../answer/answer.entity";
export declare class Question {
    question_id: number;
    content: string;
    type: string;
    score: number;
    exam: Exam;
    options: Option[];
    answers: Answer[];
}
