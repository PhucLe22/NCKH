import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // hoặc dùng key cố định (bảo mật)
const iv = crypto.randomBytes(16);


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}