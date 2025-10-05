import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    role: string;
    @IsNotEmpty()
    status: string;
    @IsNotEmpty()
    createdAt: Date;
    @IsNotEmpty()
    updatedAt: Date;
}
    