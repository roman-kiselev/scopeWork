import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CreateStorageDto } from './dto/create-storage.dto';
import { IStorage } from './interfaces/IStorage';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(
    @Inject('STORAGE_SERVICE') private readonly client: ClientProxy,
    private storageService: StorageService,
  ) {}

  @Get('/:id')
  async getOneStorageById(@Param('id') id: string) {
    // const response = await firstValueFrom(
    //   this.client.send('getOneUserById', id),
    // );
    // const user: IGetUserById = JSON.parse(response);

    const resStorage = await this.storageService.findOneStorage(+id);
    const {
      UserStorage,
      ObjectStorage,
      id: idStorage,
      name,
      address,
    } = resStorage;
    const users = UserStorage.map(({ userId }) => userId);
    const objects = ObjectStorage.map(({ objectId }) => objectId);
    const data = {
      idStorage,
      name,
      address,
      users: [],
      objects: [],
    };
    if (users.length > 0) {
      for (const user of users) {
        const dataUser = await firstValueFrom(
          this.client.send('getOneUserById', user),
        );

        data.users.push(JSON.parse(dataUser));
      }
    }

    if (objects.length > 0) {
      for (const object of objects) {
        const dataObject = await firstValueFrom(
          this.client.send('getObjectById', object),
        );

        data.objects.push(JSON.parse(dataObject));
      }
    }

    return data;
  }

  @ApiOperation({ summary: 'Создаём склад' })
  @ApiResponse({ status: HttpStatus.CREATED, type: IStorage || HttpException })
  @Post()
  createStorage(@Body() dto: CreateStorageDto) {
    return this.storageService.createStorage(dto);
  }
}
