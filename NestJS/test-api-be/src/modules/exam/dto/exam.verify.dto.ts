import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyExamCodeDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    code: string;
}