import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { EventPattern } from '@nestjs/microservices';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiTags('Пользователи')
@ApiBearerAuth()
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

    @ApiOperation({ summary: 'Получаем с данными' })
    // @ApiResponse({ status: HttpStatus.OK, type: [User] })
    // @ApiResponse({ type: HttpException })
    @Get('/withData')
    async getAllWithData() {
        return this.userService.getAllUserWithData();
    }

    @ApiOperation({ summary: 'Получаем пользователя по id' })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @ApiResponse({ type: HttpException })
    @Get('/:id')
    getUserById(@Param('id') id: number) {
        return this.userService.findUserById(id);
    }

    @ApiOperation({ summary: 'Получаем статистику пользователя' })
    // @ApiResponse({ status: HttpStatus.OK, type: User })
    // @ApiResponse({ type: HttpException })
    @Get('/getStatistics/:id')
    getStatisticsOneUser(@Param('id') id: string) {
        return this.userService.getStatisticsOneUser(id);
    }

    // Получим объекты
    @ApiOperation({ summary: 'Получаем объекты пользователя' })
    // @ApiResponse({ status: HttpStatus.OK, type: User })
    // @ApiResponse({ type: HttpException })
    @Get('/objectsUser/:id')
    getAllObjectForUser(@Param('id') id: number) {
        return this.userService.getAllObjectsForOneUser(id);
    }

    // Получим объёмы работ
    @ApiOperation({ summary: 'Получаем объёмы работ пользователя' })
    // @ApiResponse({ status: HttpStatus.OK, type: User })
    // @ApiResponse({ type: HttpException })
    @Get('/scopeWorkUser/:id')
    getAllScopeWorkForUser(@Param('id') id: number) {
        return this.userService.getAllScopeWorkForOneUser(id);
    }

    // Получим списки
    @ApiOperation({ summary: 'Получаем списки пользователя' })
    // @ApiResponse({ status: HttpStatus.OK, type: User })
    // @ApiResponse({ type: HttpException })
    @Get('/allListUser/:id')
    getAllListsForOneUser(@Param('id') id: number) {
        return this.userService.getAllListsForOneUser(id);
    }

    @ApiOperation({ summary: 'Получаем объект по email' })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @ApiResponse({ type: HttpException })
    @Get('/findByName')
    async getUserByName(@Body('email') email: string) {
        return await this.userService.findUserByEmail(email);
    }

    @ApiOperation({ summary: 'Изменяем роли' })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @ApiResponse({ type: HttpException })
    @Post('updateRoles/:id')
    async updateRoles(@Param('id') id: string, @Body() roles: string[]) {
        //console.log(id, roles);
        return await this.userService.updateRolesForUser(id, roles);
    }

    //
    @EventPattern('hello')
    async handleHello(data: string) {
        const user = await this.userService.getAllUsers();
        // console.log(JSON.stringify(user));
        // console.log(data);
        return JSON.stringify(user);
    }

    @EventPattern('getOneUserById')
    async eventGetUserById(id: string) {
        const user = await this.userService.findUserById(+id);
        return JSON.stringify(user);
    }
}
