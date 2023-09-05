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
import { CreateTypeWorkDto } from './dto/create-type-work.dto';
import { TypeWork } from './type-work.model';
import { TypeWorkService } from './type-work.service';

@ApiTags('Тип работ')
@Controller('type-work')
export class TypeWorkController {
  constructor(private typeWorkService: TypeWorkService) {}

  @ApiOperation({ summary: 'Создание типа работ' })
  @ApiResponse({ status: HttpStatus.OK, type: TypeWork })
  @ApiResponse({ type: HttpException })
  @Post('/')
  createObject(@Body() dto: CreateTypeWorkDto) {
    return this.typeWorkService.createTypeWork(dto);
  }

  @ApiOperation({ summary: 'Получить весь список' })
  @ApiResponse({ status: HttpStatus.OK, type: [TypeWork] })
  @ApiResponse({ type: HttpException })
  @Get('/')
  getAll() {
    return this.typeWorkService.findAllTypeWork();
  }

  @ApiOperation({ summary: 'Получить список коротко' })
  @ApiResponse({ status: HttpStatus.OK, type: [TypeWork] })
  @ApiResponse({ type: HttpException })
  @Get('/short')
  getAllShort() {
    return this.typeWorkService.getAllTypeWorksShort();
  }

  @ApiOperation({ summary: 'Получить весь список у объекта' })
  @ApiResponse({ status: HttpStatus.OK, type: [TypeWork] })
  @ApiResponse({ type: HttpException })
  @Get('/:id')
  getAllTypesInObject(@Param() id: number) {
    return this.typeWorkService.findAllTypeWorkInObject(id);
  }
}
