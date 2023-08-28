import { Controller } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Создание объёма' })
  @ApiResponse({ status: HttpStatus.OK, type: ScopeWork })
  @ApiResponse({ type: HttpException })
  @Post('/')
  async createScope(@Body('idTypeWork') idTypeWork: number) {
    return await this.scopeWorkService.create(idTypeWork);
  }
}
