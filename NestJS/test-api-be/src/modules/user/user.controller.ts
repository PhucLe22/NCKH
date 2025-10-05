import { Controller, Get, UseGuards, Put, Body, NotFoundException, BadRequestException, Delete, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UpdateUserDto } from './dto/user.update.dto';

@ApiTags('users')
@Controller('user') 
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    findAll() {
        return this.userService.findAll();
    }
    @Get('email')
    async findByEmail(@Body() body: { email: string }) {
        const user = await this.userService.findByEmail(body.email);
        if(!user)
        {
            throw new NotFoundException('User not found');
        }
        const response = {
            user_id: user.user_id,
            username: user.username,
            email: user.email
        }
        return response
    }
    @Get('username')
    async findByName(@Body() body: { username: string }) {
        if(!body.username)
        {
            throw new BadRequestException('Username is required');
        }
        const user = await this.userService.findByName(body.username);
        if(!user)
        {
            throw new NotFoundException('User not found');
        }
        const response = {
            user_id: user.user_id,
            username: user.username,
            email: user.email
        }
        return response
    }
    @Get(':id')
    async findById(@Param('id') id: number) {
        const user = await this.userService.findById(id);
        if(!user)
        {
            throw new NotFoundException('User not found');
        }
        const response = {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
        }
        return response
    }
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteById(@Param('id') id: number) {
      const user = await this.userService.findById(id);
      if(user.role === "admin")
      {
        const user = await this.userService.deleteById(id);
        if(!user)
        {
            throw new NotFoundException('User not found');
        }
        return `Delete user successfully ${user.username}`;
      }
      else
      {
        throw new UnauthorizedException('User not authorized');
      }
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile/:id')
    async getProfile(@Param('id') id: number) {
      if (!id) {
        throw new UnauthorizedException('User not authenticated');
      }
      try {
        const user = await this.userService.findById(id);
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
        return {
          userId: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role
        };
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          throw error;
        }
        throw new UnauthorizedException('Error fetching user profile');
      }
    }
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async updateById(@Param('id') id: number, @Body() body: UpdateUserDto) {
      const user = await this.userService.findById(id);
      if(user.role === "admin")
      {
        const user = await this.userService.updateById(id, body);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }
      else
      {
        throw new UnauthorizedException('User not authorized');
      }
    }
}
