import { Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { Param } from '@nestjs/common/decorators'
import { Body } from '@nestjs/common/decorators/http'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateObjectDto } from './dto/create-object.dto'
import { Objects } from './objects.model'
import { ObjectsService } from './objects.service'
import { Roles } from '../auth/roles-auth.decorator'
import { RolesGuard } from '../auth/roles.guard'

@ApiTags('Объекты')
@Controller('objects')
export class ObjectsController {
    constructor(private objectsService: ObjectsService) {
    }

    @ApiOperation({ summary: 'Получение всех объектов' })
    @ApiResponse({ status: HttpStatus.OK, type: [Objects] })
    @ApiResponse({ type: HttpException })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get('/')
    getAllObjects() {
        return this.objectsService.getAllObjects()
    }

    @ApiOperation({ summary: 'Создание объектов' })
    @ApiResponse({ status: HttpStatus.OK, type: Objects })
    @ApiResponse({ type: HttpException })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/')
    async createOneObject(@Body() dto: CreateObjectDto) {
        return this.objectsService.createObject(dto)
    }

    @ApiOperation({ summary: 'Добавляем связь с типом работ' })
    @ApiResponse({ status: HttpStatus.OK, type: Objects })
    @ApiResponse({ type: HttpException })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/addAssign/:id')
    async addAssignTypeWork(
        @Body('idTypeWork') idTypeWork: number,
        @Param('id') id: number
    ) {
        return this.objectsService.assignTypeWorkById({
            idObject: id,
            idTypeWork: idTypeWork
        })
    }
}
