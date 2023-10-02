import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
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

  // @ApiOperation({ summary: 'Получить все' })
  // @ApiResponse({ status: HttpStatus.OK, type: [ScopeWork] })
  // @ApiResponse({ type: HttpException })
  // @Get('/')
  // async fetAll() {
  //   return await this.scopeWorkService.getAllScopeWork();
  // }

  @ApiOperation({ summary: 'Создание объёма' })
  @ApiResponse({ status: HttpStatus.OK, type: ScopeWork })
  @ApiResponse({ type: HttpException })
  @Post('/')
  async createScope(@Body() dto: CreateScopeWorkDto) {
    return await this.scopeWorkService.createScopeWork(dto);
  }
}
