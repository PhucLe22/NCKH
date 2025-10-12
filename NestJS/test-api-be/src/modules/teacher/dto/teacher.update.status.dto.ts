import { IsEnum, IsNotEmpty } from 'class-validator';
import { TeacherStatus } from '../teacher.entity';

export class UpdateTeacherStatusDto {
  @IsNotEmpty()
  @IsEnum(TeacherStatus, {
    message: 'Status must be one of: pending, approved, rejected',
  })
  status: TeacherStatus;
}