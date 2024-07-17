// import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
// import { ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { CreateUserDescriptionDto } from './dto/create-user-description.dto';
// import { UserDescription } from './user-description.model';
// import { UserDescriptionService } from './user-description.service';

// @Controller('user-description')
// export class UserDescriptionController {
//   constructor(private userDescriptionService: UserDescriptionService) {}

//   @ApiOperation({ summary: 'Создание описания пользователя' })
//   @ApiResponse({ status: HttpStatus.OK, type: [UserDescription] })
//   @ApiResponse({ status: HttpStatus.NOT_FOUND })
//   @Get('/')
//   getAll() {
//     return this.userDescriptionService.getAll();
//   }

//   @ApiOperation({ summary: 'Создание описания пользователя' })
//   @ApiResponse({ status: HttpStatus.OK, type: UserDescription })
//   @ApiResponse({ status: HttpStatus.NOT_FOUND })
//   @Post('/')
//   create(@Body() dto: CreateUserDescriptionDto) {
//     return this.userDescriptionService.create(dto);
//   }
// }
