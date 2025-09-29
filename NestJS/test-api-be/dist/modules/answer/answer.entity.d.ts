import { Question } from "../question/question.entity";
import { Option } from "../option/option.entity";
export declare class Answer {
    id: number;
    question: Question;
    studentId: number;
    option: Option;
    text: string;
}
