import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Body } from '@nestjs/common/decorators/http';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateObjectDto } from './dto/create-object.dto';
import { Objects } from './objects.model';
import { ObjectsService } from './objects.service';

@ApiTags('Объекты')
@Controller('objects')
export class ObjectsController {
  constructor(private objectsService: ObjectsService) {}

  @ApiOperation({ summary: 'Получение всех объектов' })
  @ApiResponse({ status: HttpStatus.OK, type: [Objects] })
  @ApiResponse({ type: HttpException })
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Get('/')
  getAllObjects() {
    return this.objectsService.getAllObjects();
  }

  @Get('/shortData')
  async getAllDataShort() {
    return this.objectsService.getListObjectWithShortData();
  }

  @ApiOperation({ summary: 'Получение всех объектов(без зависимостей)' })
  @ApiResponse({ status: HttpStatus.OK, type: [Objects] })
  @ApiResponse({ type: HttpException })
  @Get('/shortAllObjects')
  async getAllShortData() {
    return this.objectsService.getShortAllObjects();
  }

  @ApiOperation({ summary: 'Получение одного объекта' })
  @ApiResponse({ status: HttpStatus.OK, type: Objects })
  @ApiResponse({ type: HttpException })
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Get('/:id')
  getOneObject(@Param('id') id: number) {
    return this.objectsService.getOneObject(id);
  }

  @Get('/getData/:id')
  getDataForOneObject(@Param('id') id: number) {
    return this.objectsService.getDataByObjectId(id);
  }

  @Get('/fullData/:id')
  async getWithFullData(@Param('id') id: number) {
    return this.objectsService.getAllScopeWorksWithFullData(id);
  }

  @ApiOperation({ summary: 'Создание объектов' })
  @ApiResponse({ status: HttpStatus.OK, type: Objects })
  @ApiResponse({ type: HttpException })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/')
  async createOneObject(@Body() dto: CreateObjectDto) {
    return this.objectsService.createObject(dto);
  }

  @ApiOperation({ summary: 'Добавляем связь с типом работ' })
  @ApiResponse({ status: HttpStatus.OK, type: Objects })
  @ApiResponse({ type: HttpException })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/addAssign/:id')
  async addAssignTypeWork(
    @Body('idTypeWork') idTypeWork: number,
    @Param('id') id: number,
  ) {
    return this.objectsService.assignTypeWorkById({
      idObject: id,
      idTypeWork: idTypeWork,
    });
  }
}
