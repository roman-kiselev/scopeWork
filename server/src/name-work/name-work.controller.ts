import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNameWorkArrDto } from './dto/create-name-work-arr.dto';
import { CreateNameWorkRowDto } from './dto/create-name-work-row.dto';
import { CreateNameWorkDto } from './dto/create-name-work.dto';
import { NameWork } from './entities/name-work.model';
import { NameWorkService } from './name-work.service';

@ApiTags('Наименования работ')
@Controller('name-work')
export class NameWorkController {
    constructor(private nameWorkService: NameWorkService) {}

    @ApiOperation({ summary: 'Получить все' })
    @ApiResponse({ status: HttpStatus.OK, type: [NameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/')
    getAll() {
        return this.nameWorkService.findAllNames();
    }

    @ApiOperation({ summary: 'Получить все целиком' })
    @ApiResponse({ status: HttpStatus.OK, type: [NameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/getAll')
    getAllC() {
        return this.nameWorkService.getAllData();
    }

    @ApiOperation({ summary: 'Поиск по имени' })
    @ApiResponse({ status: HttpStatus.OK, type: [NameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/findByName')
    findByName(@Query('text') text: string) {
        console.log(text);
        return this.nameWorkService.findNameWorksByName(text);
    }

    @ApiOperation({ summary: 'Получить по типу' })
    @ApiResponse({ status: HttpStatus.OK, type: [NameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/byTypeWork')
    getAllByTypeWork(@Query('typeWorkId') typeWorkId: string) {
        return this.nameWorkService.getAllByTypeWorkId(typeWorkId);
    }

    @ApiOperation({ summary: 'Получить по id' })
    @ApiResponse({ status: HttpStatus.OK, type: NameWork })
    @ApiResponse({ type: HttpException })
    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.nameWorkService.getOneById(id);
    }

    @ApiOperation({ summary: 'Получить по id (коротко))' })
    @ApiResponse({ status: HttpStatus.OK, type: NameWork })
    @ApiResponse({ type: HttpException })
    @Get('/short/:id')
    getOneByIdShort(@Param('id') id: number) {
        return this.nameWorkService.getOneByIdShort(id);
    }

    @ApiOperation({ summary: 'Создание нового наименования' })
    @ApiResponse({ status: HttpStatus.OK, type: NameWork })
    @ApiResponse({ type: HttpException })
    @Post('/')
    create(@Body() dto: CreateNameWorkDto) {
        return this.nameWorkService.create(dto);
    }

    @ApiOperation({ summary: 'Создание массива' })
    @ApiResponse({ status: HttpStatus.OK, type: NameWork })
    @ApiResponse({ type: HttpException })
    @Post('/arr')
    createArr(@Body() dto: CreateNameWorkArrDto[]) {
        return this.nameWorkService.createArrNameWork(dto);
    }

    @ApiOperation({ summary: 'Создание массива из excel' })
    @ApiResponse({ status: HttpStatus.OK, type: [CreateNameWorkRowDto] })
    @ApiResponse({ type: HttpException })
    @Post('/createExcel')
    createExcel(@Body() dto: CreateNameWorkRowDto[]) {
        return this.nameWorkService.createNameWork(dto);
    }
}
