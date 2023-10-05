import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TypeWork } from 'src/type-work/type-work.model';
import { TypeWorkService } from 'src/type-work/type-work.service';
import { CreateAssignDto } from './dto/create-assign.dto';
import { CreateObjectDto } from './dto/create-object.dto';
import { Objects } from './objects.model';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectModel(Objects) private objectsRepository: typeof Objects,
    @InjectModel(TypeWork) private typeWorkRepository: typeof TypeWork,
    private typeWorkService: TypeWorkService,
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
          HttpStatus.NOT_FOUND,
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

  // присвоим тип работ по id типа и наименованию работ
  async assignTypeWorkWithName(idTypeWork: number, nameObject: string) {
    try {
      // Проверяем существование объекта и типа работ
      const isObject = await this.objectsRepository.findOne({
        where: {
          name: nameObject,
        },
      });
      const isType = await this.typeWorkRepository.findByPk(idTypeWork);
      if (!isObject || !isType) {
        throw new HttpException(
          'Не удалось создать связь',
          HttpStatus.BAD_REQUEST,
        );
      }
      await isObject.$set('typeWorks', [isType.id]);
      return isObject;
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

  // присвоим тип работ по id объекта и idТипа работ
  async assignTypeWorkById(dto: CreateAssignDto) {
    try {
      console.log(dto);
      // Проверяем существование объекта и типа работ
      const isType = await this.typeWorkRepository.findOne({
        where: {
          id: dto.idTypeWork,
        },
      });
      console.log(isType);
      const isObject = await this.objectsRepository.findOne({
        rejectOnEmpty: undefined,
        where: {
          id: dto.idObject,
        },
      });
      console.log(isObject);

      if (!isObject || !isType) {
        throw new HttpException(
          'Не удалось создать связь',
          HttpStatus.BAD_REQUEST,
        );
      }
      await isObject.$set('typeWorks', [isType.id]);

      return isObject;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Создадим и присвоим тип работ
  async createOrAssignTypeWorkByName() {
    try {
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
