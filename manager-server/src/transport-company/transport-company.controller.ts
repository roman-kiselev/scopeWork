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
import { CreateTransportCompany } from './dto/create-transport-company.dto';
import { TransportCompany } from './interfaces/TransportCompany';
import { TransportCompanyService } from './transport-company.service';

@Controller('transport-company')
export class TransportCompanyController {
  constructor(
    private readonly transportCompanyService: TransportCompanyService,
  ) {}

  @ApiOperation({ summary: 'Получение всех транспортных компаний' })
  @ApiResponse({ status: HttpStatus.OK, type: [TransportCompany] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Get()
  getAll() {
    return this.transportCompanyService.getAll();
  }

  @ApiOperation({ summary: 'Получение одной по id' })
  @ApiResponse({ status: HttpStatus.OK, type: TransportCompany })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Get('/:id')
  getOneById(@Param('id') id: string) {
    return this.transportCompanyService.getOneById(id);
  }

  @ApiOperation({ summary: 'Создание транспортной компании' })
  @ApiResponse({ status: HttpStatus.OK, type: TransportCompany })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Post()
  createTransportCompany(@Body() dto: CreateTransportCompany) {
    return this.transportCompanyService.createTransportCompany(dto);
  }
}
