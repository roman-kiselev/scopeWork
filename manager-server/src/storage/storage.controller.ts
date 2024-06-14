import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStorageDto } from './dto/create-storage.dto';
import { Storage } from './interfaces/Storage';
import { StorageAndUsersAndObjects } from './interfaces/StorageAndUsersAndObjects';
import { StorageService } from './storage.service';

@ApiTags('Склады')
@Controller('storage')
export class StorageController {
  constructor(
    @Inject('STORAGE_SERVICE') private readonly client: ClientProxy,
    private storageService: StorageService,
  ) {}

  @ApiOperation({ summary: 'Получение всех складов' })
  @ApiResponse({ status: HttpStatus.OK, type: [StorageAndUsersAndObjects] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Get('/')
  async getAll() {
    return this.storageService.getAll();
  }

  @ApiOperation({ summary: 'Получение всех складов(коротко)' })
  @ApiResponse({ status: HttpStatus.OK, type: [Storage] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Get('/short')
  async getAllShort() {
    return this.storageService.getAllShort();
  }

  @ApiOperation({ summary: 'проверка наименования' })
  @ApiResponse({ status: HttpStatus.OK, type: HttpException })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpException })
  @Get('/checkName')
  async checkName(@Query('name') name: string) {
    return this.storageService.checkNameStorage(name);
  }

  @ApiOperation({ summary: 'Получаем по id' })
  @ApiResponse({ status: HttpStatus.OK, type: StorageAndUsersAndObjects })
  @Get('/:id')
  async getOneStorageById(@Param('id') id: string) {
    return await this.storageService.findOneStorage(+id);
  }

  @ApiOperation({ summary: 'Создаём склад' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Storage || HttpException,
  })
  @Post()
  createStorage(@Body() dto: CreateStorageDto) {
    return this.storageService.createStorage(dto);
  }
}
