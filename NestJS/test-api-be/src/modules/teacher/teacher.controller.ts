import { Controller, Post, Body } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/teacher.create.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Post('register')
    createTeacher(@Body() body: CreateTeacherDto) {
        body.role = 'teacher';
        return this.teacherService.createTeacher(body);
    }
}