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
import { CreateProviderWithTk } from './dto/create-provider-with-tk.dto';
import { CreateProviderDto } from './dto/create-provider.dto';
import { Provider } from './interfaces/Provider';
import { ProviderService } from './provider.service';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @ApiOperation({ summary: 'Получение всех поставщиков' })
  @ApiResponse({ status: HttpStatus.OK, type: [Provider] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Get()
  findAll() {
    return this.providerService.findAll();
  }

  @ApiOperation({ summary: 'Получение одного по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Provider })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.providerService.findOneById(id);
  }

  @ApiOperation({ summary: 'Получение полной информации по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Provider })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Get('/full/:id')
  findOneByIdFull(@Param('id') id: string) {
    return this.providerService.findOneByIdFull(id);
  }

  @ApiOperation({ summary: 'Создание поставщика' })
  @ApiResponse({ status: HttpStatus.OK, type: Provider })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Post()
  createProvider(@Body() dto: CreateProviderDto) {
    return this.providerService.createProvider(dto);
  }

  @ApiOperation({ summary: 'Создание поставщика c существующей ТК' })
  @ApiResponse({ status: HttpStatus.OK, type: Provider })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Post('/with-tk')
  createProviderWithTransportCompany(@Body() dto: CreateProviderWithTk) {
    return this.providerService.createProviderWithTransportCompany(dto);
  }
}
