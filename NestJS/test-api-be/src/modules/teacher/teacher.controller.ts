import { Controller, Post, Body } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherRequestDto } from './dto/createTeacher.dto';
import { Param, Patch } from '@nestjs/common';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('register')
  async registerRequest(@Body() dto: CreateTeacherRequestDto) {
    return this.teacherService.requestRegister(dto);
  }

  @Patch('approve/:id')
  async approveRequest(@Param('id') id: number) {
    return this.teacherService.approveRequest(Number(id));
  }
}