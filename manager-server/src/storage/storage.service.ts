import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { IStorage } from './interfaces/IStorage';

@Injectable()
export class StorageService {
  constructor(private client: DatabaseService) {}

  async createStorage(
    dto: CreateStorageDto,
  ): Promise<IStorage | HttpException> {
    try {
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
        const data = await this.client.storage.create({
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
        const data = await this.client.storage.create({
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
        const data = await this.client.storage.create({
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

      const data = await this.client.storage.create({
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
      const data = await this.client.storage.findUnique({
        where: {
          id: id,
        },
        include: {
          ObjectStorage: true,
          UserStorage: true,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
