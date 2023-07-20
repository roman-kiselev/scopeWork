import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateNameWorkDto } from './dto/create-name-work.dto';
import { NameWork } from './name-work.model';
import { NameWorkService } from './name-work.service';

@Controller('name-work')
export class NameWorkController {
  constructor(private nameWorkService: NameWorkService) {}

  @ApiOperation({ summary: 'Создание нового наименования' })
  @ApiResponse({ status: HttpStatus.OK, type: NameWork })
  @ApiResponse({ type: HttpException })
  @Post('/')
  create(@Body() dto: CreateNameWorkDto) {
    return this.nameWorkService.createNameWorkDefault(dto);
  }
}
