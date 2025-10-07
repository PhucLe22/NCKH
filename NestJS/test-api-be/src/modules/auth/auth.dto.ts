import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}

export class UpdatePasswordDto{
    @IsNotEmpty()
    newPassword: string;    
    @IsNotEmpty()
    confirmNewPassword: string;
    @IsNotEmpty()
    otp: string;
    @IsNotEmpty()
    email: string;  
}

    