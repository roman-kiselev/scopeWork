import { Controller } from '@nestjs/common';
import { ScopeWorkService } from './scope-work.service';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScopeWork } from './scope-work.model';
import { HttpException } from '@nestjs/common/exceptions';
import { Body, Post, Get } from '@nestjs/common/decorators';

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
  async createScope(@Body('idScopeWork') idScopeWork: number) {
    return await this.scopeWorkService.createScopeWork(idScopeWork);
  }
}
