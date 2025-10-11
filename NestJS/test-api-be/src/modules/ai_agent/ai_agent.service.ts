import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import { Readable } from 'stream';

@Injectable()
export class AIService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async generateQuestionsFromFile(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File is required');

    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);

    const formData = new FormData();
    formData.append('file', stream, { filename: file.originalname });

    const baseUrl = this.configService.get<string>('AI_AGENT_URL') || 'http://localhost:8000';
    if (!baseUrl) throw new Error('AI_AGENT_URL is not defined in .env');

    const url = `${baseUrl.replace(/\/+$/, '')}/api/generate-questions-from-file`;
    console.log('📡 Sending request to AI service:', url);

    try {
      const { data } = await this.httpService.axiosRef.post(url, formData, {
        headers: formData.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
      return data;
    } catch (error) {
      console.error('❌ Error calling AI service:', error.message);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
      throw new Error(`AI service failed: ${error.message}`);
    }
  }
}
