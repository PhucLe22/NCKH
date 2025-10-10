import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateExamDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @ApiProperty()
    start_time: Date;

    @IsNotEmpty()
    @ApiProperty()
    end_time: Date;

    @IsNotEmpty()
    @ApiProperty()
    duration: number;

    @IsNotEmpty()
    @ApiProperty()
    code: string;

    @ApiProperty()
    status: string;
}