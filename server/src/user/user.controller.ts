import { Controller } from '@nestjs/common';
import { Body, Get } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Получаем всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @ApiResponse({ type: HttpException })
  @Get('/')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получаем объект по email' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponse({ type: HttpException })
  @Get('/findByName')
  async getUserByName(@Body('email') email: string) {
    return await this.userService.findUserByEmail(email);
  }
}
