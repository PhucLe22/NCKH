import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import { Readable } from 'stream';

interface AIResponse {
  content: string,
  sampleAnswer?: string,
  estimateScore?: number,
  type: 'mcq' | 'essay' | 'true_false',
  key_points: string;
  [key: string]: any;
}

@Injectable()
export class AIService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async generateQuestionsFromFile(file: Express.Multer.File) {
    if (!file?.buffer) {
      throw new BadRequestException('Invalid file provided');
    }
  
    try {
      const formData = new FormData();
      
      formData.append('file', file.buffer, {
        filename: file.originalname || 'uploaded_file',
        contentType: file.mimetype,
        knownLength: file.size
      });
  
      const baseUrl = this.configService.get<string>('AI_AGENT_URL', 'http://localhost:8000');
      const url = `${baseUrl.replace(/\/+$/, '')}/api/generate-questions-from-file`;
      
      console.log('📡 Sending request to AI service:', url);
  
      const headers = formData.getHeaders();
  
      const response = await new Promise<AIResponse>((resolve, reject) => {
        formData.submit({
          host: new URL(url).hostname,
          port: new URL(url).port || (url.startsWith('https') ? 443 : 80),
          path: new URL(url).pathname,
          method: 'POST',
          headers: headers,
          protocol: url.startsWith('https') ? 'https:' : 'http:'
        }, (err, res) => {
          if (err) return reject(err);
          
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              const responseData = JSON.parse(data);
              resolve({
                ...responseData
              });
            } catch (e) {
              reject(new Error(`Failed to parse response: ${e.message}`));
            }
          });
        });
      });
  
      if (!response?.questions) {
        console.error('Empty or invalid response from AI service:', response);
        throw new Error('Empty response from AI service');
      }

      console.log('Received response from AI service');
      
      return {
        key_points: response.key_points,
        questions: response.questions
      };
    } catch (error) {
      console.error('❌ Error calling AI service:', error);
    }
  }
}
