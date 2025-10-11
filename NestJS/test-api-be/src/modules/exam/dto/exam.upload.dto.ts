import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ExamUploadDto {

    @IsNotEmpty()
    @ApiProperty()
    exam_id: number;
}