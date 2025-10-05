import { IsNotEmpty } from "class-validator";

export class CreateTeacherDto {
    @IsNotEmpty()
    department: string;
    @IsNotEmpty()
    user_id: number;
}
