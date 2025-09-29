import { IsNotEmpty } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    price: number;
}

export class UpdateCourseDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
}
