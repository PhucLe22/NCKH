import { Controller } from '@nestjs/common';
import { CourseService } from './course.service';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Put } from '@nestjs/common';
import {UpdateCourseDto} from './course.dto';
import { CreateCourseDto } from './course.dto';
import { NotFoundException } from '@nestjs/common';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}
    @Get()
    findAll(){  
        return this.courseService.findAll();
    }
    @Get(':id')
    findById(@Param('id') id: number){
        return this.courseService.findById(id);
    }
    @Delete('delete/:id')
    deleteById(@Param('id') id: number){
        return this.courseService.deleteById(id);
    }
    @Put('update/:id')
    async updateCourse(@Param('id') id: number, @Body() body: UpdateCourseDto){
        const course = await this.courseService.updateCourse(id, body);
        if(!course)
        {
            throw new NotFoundException('Course not found');
        }
        return `Update course successfully`;
    }
    @Post('create')
    async createCourse(@Body() body: CreateCourseDto){
        const course = await this.courseService.createCourse(body);
        return `Create course successfully ${course.name}`;
    }
}
