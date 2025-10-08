import { IsNotEmpty } from "class-validator";

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