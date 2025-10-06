// teacher/dto/teacher.create.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from '../../user/dto/user.create.dto';

export class CreateTeacherDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  department: string;
}
