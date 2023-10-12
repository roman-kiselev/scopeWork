import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
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

  @ApiOperation({ summary: 'Получение данных по одному наименованию' })
  @Get('/getDateForOne')
  getDateForOne(
    @Query('nameWorkId') nameWorkId: number,
    @Query('listId') listId: number,
  ) {
    return this.nameListService.getDateByNameWorkIdAndListId(
      nameWorkId,
      listId,
    );
  }

  @ApiOperation({ summary: 'Создание' })
  @ApiResponse({ status: HttpStatus.OK, type: [NameList] })
  @ApiResponse({ type: HttpException })
  @Post('/')
  create(@Body() dto: CreateNameListDto) {
    return this.nameListService.create(dto);
  }
}
