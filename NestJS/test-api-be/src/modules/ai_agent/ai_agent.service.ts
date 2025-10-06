import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { QuestionRepository } from '../question/question.repository';
import { ExamRepository } from '../exam/exam.repository';
import { Question } from '../question/question.entity';

interface QuestionData {
  content: string;
  type?: string;
  score?: number;
  exam?: any; 
  options?: any[];
}

@Injectable()
export class AiAgentService {
  constructor(
    @Inject('AI_AGENT_URL') private readonly aiUrl: string,
    private readonly questionRepository: QuestionRepository,
    private readonly examRepository: ExamRepository,
  ) {}    async generateQuestions(text: string, examId: number): Promise<Question[]> {
        const response = await axios.post<QuestionData[]>(`${this.aiUrl}/generate-questions-from-text`, { text });
        const questions = response.data;

        const selectedExam = await this.examRepository.findOne({ where: { exam_id: examId } });
        
        const savedQuestions: Question[] = [];
        for (const question of questions) {
            const savedQuestion = await this.questionRepository.createQuestion({
                ...question,
                type: question.type || 'multiple_choice', 
                score: question.score || null, 
                exam: selectedExam,
                options: question.options || []
            } as Question);
            savedQuestions.push(savedQuestion);
        }
        return savedQuestions;
      }
    
      async reviewExam(examId: number) {
        const res = await axios.post(`${this.aiUrl}/generate-questions-from-file`, { examId });
        return res.data;
      }
}
