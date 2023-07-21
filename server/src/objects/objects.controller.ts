import {
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @Get('/')
  getAllObjects() {
    return this.objectsService.getAllObjects();
  }

  @ApiOperation({ summary: 'Создание объектов' })
  @ApiResponse({ status: HttpStatus.OK, type: Objects })
  @ApiResponse({ type: HttpException })
  @Post('/')
  createOneObject(@Body() dto: CreateObjectDto) {
    return this.objectsService.createObject(dto);
  }
}
