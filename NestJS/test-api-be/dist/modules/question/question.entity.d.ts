import { Exam } from "../exam/exam.entity";
import { Option } from "../option/option.entity";
import { Answer } from "../answer/answer.entity";
export declare enum QuestionType {
    MULTIPLE_CHOICE = "multiple_choice",
    ESSAY = "essay",
    TRUE_FALSE = "true_false"
}
export declare class Question {
    question_id: number;
    content: string;
    type: QuestionType;
    score: number;
    exam: Exam;
    options: Option[];
    answers: Answer[];
}
