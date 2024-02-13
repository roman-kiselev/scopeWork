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
import { CreateScopeWorkDto } from './dto/create-scope-work.dto';
import { EditScopeWorkDto } from './dto/edit-scope-work.dto';
import { IScopeworkShort } from './interfaces/IScopeworkShort';
import { ScopeWork } from './scope-work.model';
import { ScopeWorkService } from './scope-work.service';

@ApiTags('Объём работ')
@Controller('scope-work')
export class ScopeWorkController {
  constructor(private scopeWorkService: ScopeWorkService) {}

  @ApiOperation({ summary: 'Получить все' })
  @ApiResponse({ status: HttpStatus.OK, type: [ScopeWork] })
  @ApiResponse({ type: HttpException })
  @Get('/')
  async getAll() {
    return await this.scopeWorkService.getAllScopeWork();
  }

  @ApiOperation({ summary: 'Получить все объёмы SQL' })
  @ApiResponse({ status: HttpStatus.OK, type: [IScopeworkShort] })
  @ApiResponse({ type: HttpException })
  @Get('/getShort')
  async getShort() {
    return await this.scopeWorkService.getAllScopeWorkSqlShort();
  }

  @ApiOperation({ summary: 'Получить один' })
  @ApiResponse({ status: HttpStatus.OK, type: ScopeWork })
  @ApiResponse({ type: HttpException })
  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    return await this.scopeWorkService.getOneScopeWork(id);
  }

  @ApiOperation({ summary: 'Получить все для пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: ScopeWork })
  @ApiResponse({ type: HttpException })
  @Get('/getAllByUserId/:id')
  async getAllByuserId(@Param('id') id: string) {
    return await this.scopeWorkService.getAllScopeWorkByUserId(id);
  }

  @ApiOperation({ summary: 'Получить историю' })
  @ApiResponse({ status: HttpStatus.OK, type: [IScopeworkShort] })
  @ApiResponse({ type: HttpException })
  @Get('/getHistory/:id')
  async getHistory(
    @Param('id') id: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ) {
    return await this.scopeWorkService.getHistoryTimeline({
      idScopeWork: +id,
      dateFrom,
      dateTo,
    });
  }

  @ApiOperation({ summary: 'Получить все наменования для одного объёма' })
  @ApiResponse({ status: HttpStatus.OK, type: ScopeWork })
  @ApiResponse({ type: HttpException })
  @Get('/getListByScopeWorkId/:id')
  async getListByScopeWorkId(@Param('id') id: string) {
    return await this.scopeWorkService.getAllListWorkForEditByScopeWorkId(id);
  }

  @ApiOperation({ summary: 'Создание объёма' })
  @ApiResponse({ status: HttpStatus.OK, type: ScopeWork })
  @ApiResponse({ type: HttpException })
  @Post('/')
  async createScope(@Body() dto: CreateScopeWorkDto) {
    return await this.scopeWorkService.createScopeWork(dto);
  }

  @ApiOperation({ summary: 'Редактирование объёма' })
  @ApiResponse({ status: HttpStatus.OK, type: ScopeWork })
  @ApiResponse({ type: HttpException })
  @Post('/edit')
  async updateScopeWork(@Body() dto: EditScopeWorkDto) {
    return await this.scopeWorkService.editScopeWork(dto);
  }
}
