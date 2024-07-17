import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateListDto } from './dto/create-list.dto';
import { ListNameWorkEditDto } from './dto/list-name-work-edit.dto';
import { ListNameWork } from './entities/list-name-work.model';
import { ListNameWorkService } from './list-name-work.service';

@ApiTags('Список листов')
@Controller('list-name-work')
export class ListNameWorkController {
    constructor(private listNameWorkService: ListNameWorkService) {}

    @ApiOperation({ summary: 'Получение всех наименований списков' })
    @ApiResponse({ status: HttpStatus.OK, type: [ListNameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/')
    getAllList() {
        return this.listNameWorkService.getAllList();
    }

    @ApiOperation({ summary: 'Получение всех наименований без связных' })
    @ApiResponse({ status: HttpStatus.OK, type: [ListNameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/short')
    getAllListShort() {
        return this.listNameWorkService.getAllShort();
    }

    @ApiOperation({ summary: 'Получить один' })
    @ApiResponse({ status: HttpStatus.OK, type: ListNameWork })
    @ApiResponse({ type: HttpException })
    @Get('/:id')
    getOneById(@Param('id') id: string) {
        return this.listNameWorkService.getOneById(id);
    }

    @ApiOperation({ summary: 'Копируем один' })
    @ApiResponse({ status: HttpStatus.OK, type: ListNameWork })
    @ApiResponse({ type: HttpException })
    @Get('/copy/:id')
    copyListById(@Param('id') id: string) {
        return this.listNameWorkService.copyList(id);
    }

    @ApiOperation({ summary: 'Получаем списки по id объёма' })
    @ApiResponse({ status: HttpStatus.OK, type: ListNameWork })
    @ApiResponse({ type: HttpException })
    @Get('/getByScopeWork/:id')
    getByScopeWork(@Param('id') id: number) {
        return this.listNameWorkService.getAllListByScopeWorkId(id);
    }

    @ApiOperation({ summary: 'Получение списка по тип работ' })
    @ApiResponse({ status: HttpStatus.OK, type: [ListNameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/byTypeWork/:id')
    getListByTypeId(@Param('id') id: string) {
        return this.listNameWorkService.getListNameWorksByTypeWorkId(id);
    }

    @ApiOperation({ summary: 'Получение прогресса для одного списка' })
    @Get('/getProgressForOneList/:id')
    getProgressForOnуId(@Param('id') id: number) {
        return this.listNameWorkService.getProgressForOneList(id);
    }

    @ApiOperation({ summary: 'Создание' })
    @ApiResponse({ status: HttpStatus.OK, type: ListNameWork })
    @ApiResponse({ type: HttpException })
    @Post('/')
    createNameList(@Body() dto: CreateListDto) {
        return this.listNameWorkService.createList(dto);
    }

    @ApiOperation({ summary: 'Редактирование' })
    @ApiResponse({ status: HttpStatus.OK, type: ListNameWork })
    @ApiResponse({ type: HttpException })
    @Post('/edit')
    editNameList(@Body() dto: ListNameWorkEditDto) {
        return this.listNameWorkService.editList(dto);
    }

    @ApiOperation({ summary: 'Удаление' })
    @ApiResponse({ status: HttpStatus.OK, type: ListNameWork })
    @ApiResponse({ type: HttpException })
    @Delete('/del/:id')
    delList(@Param('id') id: string) {
        return this.listNameWorkService.delList(id);
    }
}
