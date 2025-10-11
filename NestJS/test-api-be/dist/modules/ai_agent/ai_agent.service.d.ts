import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class AIService {
    private readonly httpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    generateQuestionsFromFile(file: Express.Multer.File): Promise<any>;
}
