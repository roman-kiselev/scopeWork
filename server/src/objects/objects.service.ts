import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateObjectDto } from './dto/create-object.dto';
import { Objects } from './objects.model';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectModel(Objects) private objectsRepository: typeof Objects,
  ) {}

  async checkByNameObject(name: string) {
    try {
      const object = await this.objectsRepository.findOne({
        where: {
          name,
          deletedAt: null,
        },
      });
      if (object) {
        return true;
      }
      return false;
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

  async createObject(dto: CreateObjectDto) {
    try {
      const foundObject = await this.checkByNameObject(dto.name);
      if (foundObject) {
        throw new HttpException(
          'Объект с таким наименованием существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const object = await this.objectsRepository.create(dto);
      if (!object) {
        throw new HttpException(
          'Не удалось создать объект',
          HttpStatus.BAD_REQUEST,
        );
      }
      return object;
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

  async getAllObjects() {
    try {
      const objects = await this.objectsRepository.findAll({
        include: { all: true },
      });

      if (!objects) {
        throw new HttpException(
          'Не удалось выполнить запрос',
          HttpStatus.BAD_REQUEST,
        );
      }

      return objects;
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
