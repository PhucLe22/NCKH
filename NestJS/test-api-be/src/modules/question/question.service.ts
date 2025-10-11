import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { ExamRepository } from '../exam/exam.repository';
import { CreateQuestionDto } from './dto/question.create.dto';

@Injectable()
export class QuestionService {
    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly examRepository: ExamRepository,
    ) {}

    async saveQuestions(examId: number, questions: CreateQuestionDto[]) {
        const exam = await this.examRepository.findOne({ where: { exam_id: examId } });
        if (!exam) throw new Error('Exam not found');

        const entities = questions.map((q) =>
          this.questionRepository.create({
            content: q.question_text,
            type: q.type,
            score: q.score,
            exam,
          }),
        );

        return await this.questionRepository.save(entities);
      }
    async findQuestionByExamId(exam_id: number) {
        return this.questionRepository.findQuestionByExamId(exam_id);
    }
    async deleteQuestionByExamId(exam_id: number) {
        return this.questionRepository.deleteQuestionByExamId(exam_id);
    }
    async findAllQuestions()
    {
        return this.questionRepository.findAll();
    }
}
