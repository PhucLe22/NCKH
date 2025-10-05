import { IsEmail, IsString } from "class-validator";

export class CreateTeacherDto {
    @IsString()
    userId: string;

    @IsString()
    departmentId: string;

    @IsString()
    role: string = 'teacher';
}
