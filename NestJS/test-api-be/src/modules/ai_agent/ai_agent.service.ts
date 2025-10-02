import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiAgentService {
    private readonly aiUrl = "http://python-ai:8000/api";
    async generateQuestions(text: string) {
        const res = await axios.post(`${this.aiUrl}/generate-questions`, { text });
        return res.data;
      }
    
      async reviewExam(examId: number) {
        const res = await axios.post(`${this.aiUrl}/review-exam`, { examId });
        return res.data;
      }
}
