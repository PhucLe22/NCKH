import { IsString } from "class-validator";

export class CreateAdminDto {
    @IsString()
    password: string;
    @IsString()
    username: string;
    @IsString()
    email: string;
    @IsString()
    adminCode: string;
  }