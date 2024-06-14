import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Storage } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { EditStorageDto } from './dto/edit-storage.dto';
import { StorageAndUsersAndObjects } from './interfaces/StorageAndUsersAndObjects';

@Injectable()
export class StorageService {
  constructor(
    @Inject('STORAGE_SERVICE') private readonly client: ClientProxy,
    private clientDatabase: DatabaseService,
  ) {}
  async createStorage(dto: CreateStorageDto): Promise<Storage | HttpException> {
    try {
      if (dto.name !== '') {
        const findedStorage = await this.clientDatabase.storage.findMany({
          where: {
            name: dto.name,
          },
        });
        if (findedStorage.length > 0) {
          throw new HttpException(
            'Склад с таким наименованием уже существует',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      if (
        (!dto.name && !dto.address) ||
        (dto.name === '' && dto.address === '')
      ) {
        throw new HttpException(
          'Отсутсвуют данные для создания склада',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        dto.name !== '' &&
        dto.address !== '' &&
        !dto.objectId &&
        !dto.userId
      ) {
        const data = await this.clientDatabase.storage.create({
          data: {
            name: dto.name,
            address: dto.address,
          },
        });

        return data;
      }

      if (
        dto.name !== '' &&
        dto.address !== '' &&
        !dto.objectId &&
        dto.userId !== ''
      ) {
        const data = await this.clientDatabase.storage.create({
          data: {
            name: dto.name,
            address: dto.address,
            UserStorage: {
              create: {
                userId: +dto.userId,
              },
            },
          },
        });

        return data;
      }

      if (
        dto.name !== '' &&
        dto.address !== '' &&
        dto.objectId !== '' &&
        !dto.userId
      ) {
        const data = await this.clientDatabase.storage.create({
          data: {
            name: dto.name,
            address: dto.address,
            ObjectStorage: {
              create: {
                objectId: +dto.objectId,
              },
            },
          },
        });

        return data;
      }

      const data = await this.clientDatabase.storage.create({
        data: {
          name: dto.name,
          address: dto.address,
          ObjectStorage: {
            create: {
              objectId: +dto.objectId,
            },
          },
          UserStorage: {
            create: {
              userId: +dto.userId,
            },
          },
        },
      });
      return data;
    } catch (e) {
      if (e instanceof HttpException) {
        console.log(e);
        throw e;
      }
      console.log(e);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findOneStorage(id: number) {
    try {
      const data = await this.clientDatabase.storage.findUnique({
        where: {
          id: id,
        },
        include: {
          ObjectStorage: true,
          UserStorage: true,
        },
      });

      const { UserStorage, ObjectStorage, id: idStorage, name, address } = data;
      const users = UserStorage.map(({ userId }) => userId);
      const objects = ObjectStorage.map(({ objectId }) => objectId);
      const dataRes: StorageAndUsersAndObjects = {
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

          dataRes.users.push(JSON.parse(dataUser));
        }
      }

      if (objects.length > 0) {
        for (const object of objects) {
          const dataObject = await firstValueFrom(
            this.client.send('getObjectById', object),
          );

          dataRes.objects.push(JSON.parse(dataObject));
        }
      }

      return dataRes;
    } catch (e) {
      console.log(e);
    }
  }
  async checkNameStorage(name: string) {
    try {
      const storage = await this.clientDatabase.storage.findMany({
        where: {
          name: name,
        },
      });

      if (storage.length > 0) {
        throw new HttpException(
          'Склад с таким наименование уже существует',
          HttpStatus.OK,
        );
      }

      throw new HttpException('Склад не найден', HttpStatus.NOT_FOUND);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // Получение всех складов
  async getAll() {
    try {
      const data = await this.clientDatabase.storage.findMany({
        include: {
          ObjectStorage: true,
          UserStorage: true,
        },
      });

      const arrData = [];
      for (const { id } of data) {
        const res = await this.findOneStorage(id);
        arrData.push(res);
      }

      return arrData;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Получение короткого содержания
  async getAllShort() {
    try {
      const data = await this.clientDatabase.storage.findMany();

      return data;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Редактирование описания склада
  async editStorageDescription(dto: EditStorageDto) {
    try {
      const { id } = dto;
      const checkStorage = await this.clientDatabase.storage.findUnique({
        where: {
          id: +id,
        },
        include: {
          ObjectStorage: true,
          UserStorage: true,
        },
      });

      if (
        checkStorage &&
        dto.objectId !== undefined &&
        dto.userId !== undefined
      ) {
        const data = await this.clientDatabase.storage.update({
          where: {
            id: +dto.id,
          },
          data: {
            name: dto.name,
            address: dto.address,
            ObjectStorage: {
              update: {
                where: {
                  id: checkStorage.ObjectStorage[0].id,
                },
                data: {
                  objectId: +dto.objectId,
                },
              },
            },
            UserStorage: {
              update: {
                where: {
                  id: checkStorage.UserStorage[0].id,
                },
                data: {
                  userId: +dto.userId,
                },
              },
            },
          },
        });
      }
      const storage = await this.clientDatabase.storage.findUnique({
        where: {
          id: +id,
        },
        include: {
          ObjectStorage: true,
          UserStorage: true,
        },
      });

      return storage;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
