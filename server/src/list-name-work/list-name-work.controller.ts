import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateListDto } from './dto/create-list.dto';
import { ListNameWork } from './list-name-work.model';
import { ListNameWorkService } from './list-name-work.service';

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

  @ApiOperation({ summary: 'Получить один' })
  @ApiResponse({ status: HttpStatus.OK, type: ListNameWork })
  @ApiResponse({ type: HttpException })
  @Get('/:id')
  getOneById(@Param('id') id: number) {
    return this.listNameWorkService.getOneById(id);
  }

  @ApiOperation({ summary: 'Создание' })
  @ApiResponse({ status: HttpStatus.OK, type: ListNameWork })
  @ApiResponse({ type: HttpException })
  @Post('/')
  createNameList(@Body() dto: CreateListDto) {
    console.log(dto);
    return this.listNameWorkService.createList(dto);
  }
}
