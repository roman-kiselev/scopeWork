import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateScopeWorkDto } from './dto/create-scope-work.dto';
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
  async fetAll() {
    return await this.scopeWorkService.getAllScopeWork();
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
}
