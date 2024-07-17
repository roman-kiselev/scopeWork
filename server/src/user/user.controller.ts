// import { Controller } from '@nestjs/common';
// import { Body, Get, Inject, Param, Post } from '@nestjs/common/decorators';
// import { HttpStatus } from '@nestjs/common/enums';
// import { HttpException } from '@nestjs/common/exceptions';
// import { ClientProxy, EventPattern } from '@nestjs/microservices';
// import {
//     ApiBearerAuth,
//     ApiOperation,
//     ApiResponse,
//     ApiTags,
// } from '@nestjs/swagger';
// import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
// import { User } from './user.model';
// import { UserService } from './user.service';

// @ApiTags('Пользователи')
// @ApiBearerAuth()
// @Controller('user')
// export class UserController {
//     constructor(
//         private userService: UserService,
//         @Inject('USER_MAIN_SERVICE') private readonly client: ClientProxy,
//     ) {}

//     @ApiOperation({ summary: 'Получаем всех пользователей' })
//     @ApiResponse({ status: HttpStatus.OK, type: [User] })
//     @ApiResponse({ type: HttpException })
//     @Get('/')
//     getAllUsers(@ActiveUser('organizationId') organizationId: number) {
//         return this.userService.getAllUsers(organizationId);
//     }

//     @ApiOperation({ summary: 'Получаем с данными' })
//     // @ApiResponse({ status: HttpStatus.OK, type: [User] })
//     // @ApiResponse({ type: HttpException })
//     @Get('/withData')
//     async getAllWithData(@ActiveUser('organizationId') organizationId: number) {
//         return await this.userService.findAllWithRelations(organizationId, [
//             'roles',
//             'description',
//         ]);
//     }

//     @ApiOperation({ summary: 'Получаем пользователя по id' })
//     @ApiResponse({ status: HttpStatus.OK, type: User })
//     @ApiResponse({ type: HttpException })
//     @Get('/:id')
//     getUserById(
//         @Param('id') id: number,
//         @ActiveUser('organizationId') organizationId: number,
//     ) {
//         return this.userService.findUserBy({
//             criteria: { id, organizationId },
//             relations: ['roles', 'description'],
//         });
//     }

//     @ApiOperation({ summary: 'Изменяем роли' })
//     @ApiResponse({ status: HttpStatus.OK, type: User })
//     @ApiResponse({ type: HttpException })
//     @Post('updateRoles/:id')
//     async updateRoles(@Param('id') id: string, @Body() roles: string[]) {
//         return await this.userService.updateRolesForUser(id, roles);
//     }

//     // @ApiOperation({ summary: 'Получаем статистику пользователя' })
//     // // @ApiResponse({ status: HttpStatus.OK, type: User })
//     // // @ApiResponse({ type: HttpException })
//     // @Get('/getStatistics/:id')
//     // getStatisticsOneUser(@Param('id') id: string) {
//     //     return this.userService.getStatisticsOneUser(id);
//     // }

//     // // Получим объекты
//     // @ApiOperation({ summary: 'Получаем объекты пользователя' })
//     // // @ApiResponse({ status: HttpStatus.OK, type: User })
//     // // @ApiResponse({ type: HttpException })
//     // @Get('/objectsUser/:id')
//     // getAllObjectForUser(@Param('id') id: number) {
//     //     return this.userService.getAllObjectsForOneUser(id);
//     // }

//     // // Получим объёмы работ
//     // @ApiOperation({ summary: 'Получаем объёмы работ пользователя' })
//     // // @ApiResponse({ status: HttpStatus.OK, type: User })
//     // // @ApiResponse({ type: HttpException })
//     // @Get('/scopeWorkUser/:id')
//     // getAllScopeWorkForUser(@Param('id') id: number) {
//     //     return this.userService.getAllScopeWorkForOneUser(id);
//     // }

//     // // Получим списки
//     // @ApiOperation({ summary: 'Получаем списки пользователя' })
//     // // @ApiResponse({ status: HttpStatus.OK, type: User })
//     // // @ApiResponse({ type: HttpException })
//     // @Get('/allListUser/:id')
//     // getAllListsForOneUser(@Param('id') id: number) {
//     //     return this.userService.getAllListsForOneUser(id);
//     // }

//     // @ApiOperation({ summary: 'Получаем объект по email' })
//     // @ApiResponse({ status: HttpStatus.OK, type: User })
//     // @ApiResponse({ type: HttpException })
//     // @Post('/findByName')
//     // async getUserByName(
//     //     @Body() dto: GetUserDto,
//     //     @ActiveUser() user: ActiveUserData,
//     // ) {
//     //     console.log(user);
//     //     return await this.userService.findUserBy({
//     //         criteria: dto.criteria,
//     //         relations: dto.relations,
//     //     });
//     // }

//     @EventPattern('getOneUserById')
//     async eventGetUserById(
//         id: string,
//         @ActiveUser('organizationId') organizationId: number,
//     ) {
//         return this.userService.findUserBy({
//             criteria: { id: +id, organizationId },
//             relations: ['roles', 'description'],
//         });
//     }
// }
