import { Controller, Post, Body } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateUserDto } from '../user/dto/user.create.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Post('register')
    createTeacher(@Body() body: CreateUserDto) {
        return this.teacherService.createTeacher(body);
    }
}
