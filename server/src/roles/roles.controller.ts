// import { Controller } from '@nestjs/common';
// import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
// import { HttpStatus } from '@nestjs/common/enums';
// import { NotFoundException } from '@nestjs/common/exceptions';
// import {
//     ApiBearerAuth,
//     ApiOperation,
//     ApiResponse,
//     ApiTags,
// } from '@nestjs/swagger';
// import { CreateRoleDto } from './dto/create-role.dto';
// import { Roles } from './roles.model';
// import { RolesService } from './roles.service';

// @ApiTags('Роли')
// @ApiBearerAuth()
// @Controller('roles')
// export class RolesController {
//     constructor(private rolesService: RolesService) {}

//     @ApiOperation({ summary: 'Создание роли' })
//     @ApiResponse({ status: HttpStatus.CREATED, type: Roles })
//     @ApiResponse({
//         status: HttpStatus.NOT_FOUND,
//         description: 'Ошибка валидации',
//     })
//     // Создаём роль
//     @Post()
//     create(@Body() roleDto: CreateRoleDto) {
//         try {
//             return this.rolesService.createRole(roleDto);
//         } catch (e) {
//             throw new NotFoundException(e.message || 'Произошла ошибка');
//         }
//     }

//     @ApiOperation({ summary: 'Получаем список ролей' })
//     @ApiResponse({ status: HttpStatus.OK, type: [Roles] })
//     @ApiResponse({
//         status: HttpStatus.NOT_FOUND,
//         description: 'Список ролей пуст' || 'Произошла ошибка',
//     })
//     // Получаем список ролей
//     @Get()
//     findAll() {
//         return this.rolesService.getAllRoles();
//     }

//     @ApiOperation({ summary: 'Получаем роль по наименованию' })
//     @ApiResponse({ status: 200, type: Roles })
//     @Get('findByName/:name')
//     findByName(@Param('name') name: string) {
//         return this.rolesService.findRoleByName(name);
//     }

//     @ApiOperation({ summary: 'Получаем роль по id' })
//     @ApiResponse({ status: 200, type: Roles })
//     // Получаем роль по id
//     @Get(':id')
//     findOne(@Param('id') id: number) {
//         return this.rolesService.getRoleById(id);
//     }

//     @ApiOperation({ summary: 'Получаем роль по userId' })
//     @ApiResponse({ status: 200, type: Roles })
//     // Получаем роль по id
//     @Get('user/:id')
//     findAllRolesByUserId(@Param('id') id: number) {
//         return this.rolesService.getAllRolesByUserId(id);
//     }

//     @ApiOperation({ summary: 'Удаляем роль' })
//     @ApiResponse({ status: 200, type: Roles })
//     // Удаляем роль
//     @Delete(':id')
//     delete(@Param('id') id: number) {
//         return this.rolesService.deleteRole(id);
//     }

//     @ApiOperation({ summary: 'Обновляем роль' })
//     @ApiResponse({ status: 201, type: Roles })
//     // Обновляем роль
//     @Put(':id')
//     update(@Param('id') id: number, @Body() roleDto: CreateRoleDto) {
//         return this.rolesService.updateRole(id, roleDto);
//     }
// }
