import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateTeacherRequestDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;
}
