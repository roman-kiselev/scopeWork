import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateNameListDto } from './dto/create-name-list.dto';
import { NameList } from './name-list.model';
import { NameListService } from './name_list.service';

@Controller('name-list')
export class NameListController {
  constructor(private nameListService: NameListService) {}

  @ApiOperation({ summary: 'Получение всех списков' })
  @ApiResponse({ status: HttpStatus.OK, type: [NameList] })
  @ApiResponse({ type: HttpException })
  @Get('/')
  getAll() {
    return this.nameListService.getAll();
  }

  @ApiOperation({ summary: 'Создание' })
  @ApiResponse({ status: HttpStatus.OK, type: [NameList] })
  @ApiResponse({ type: HttpException })
  @Post('/')
  create(@Body() dto: CreateNameListDto) {
    return this.nameListService.create(dto);
  }
}
