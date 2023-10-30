import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NameList } from 'src/name_list/name-list.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
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
    @InjectModel(ScopeWork) private scopeWorkRepository: typeof ScopeWork,
    @InjectModel(NameList) private nameListRepository: typeof NameList,
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

  async getDataForOneScopeWorkShort(idScopeWork: number) {
    try {
      const scopeWork = await this.scopeWorkRepository.findByPk(idScopeWork, {
        include: { all: true },
      });

      const { listNameWork, tableAddingData } = scopeWork;
      let arrNames = [];
      for (const item of listNameWork) {
        const arr = await this.nameListRepository.findAll({
          where: {
            listNameWorkId: item.id,
          },
        });
        arrNames = [...arrNames, ...arr];
      }
      const mainCount = arrNames
        .map((item) => item.quntity)
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
      // Получим общее количество изменений
      const countTableAddingData = tableAddingData
        .map((item) => item.quntity)
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);

      return {
        id: scopeWork.id,
        deletedAt: scopeWork.deletedAt,
        typeWorkId: scopeWork.typeWorkId,
        objectId: scopeWork.objectId,
        createdAt: scopeWork.createdAt,
        mainCount,
        countTableAddingData,
        percentAll: ((countTableAddingData / mainCount) * 100).toFixed(1),
      };
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

  async getDataByObjectId(idObject: number) {
    try {
      const oneObject = await this.objectsRepository.findByPk(idObject, {
        include: { all: true },
      });

      let dataObject = [];
      const { scopeWorks } = oneObject;
      // Перебираем объёмы работ
      for (const item of scopeWorks) {
        const scopeWork = await this.getDataForOneScopeWorkShort(item.id);
        dataObject.push(scopeWork);
      }
      const mainCount = dataObject
        .map((item) => item.mainCount)
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
      const countTableAddingData = dataObject
        .map((item) => item.countTableAddingData)
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);

      return {
        id: oneObject.id,
        name: oneObject.name,
        address: oneObject.address,
        createdAt: oneObject.createdAt,
        mainCount,
        countTableAddingData,
        percentAll: ((countTableAddingData / mainCount) * 100).toFixed(1),
        dataObject,
      };
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

  async getListObjectWithShortData() {
    try {
      const objects = await this.objectsRepository.findAll();
      const allObjestWithData = [];
      for (const { id } of objects) {
        const oneObject = await this.getDataByObjectId(id);
        allObjestWithData.push(oneObject);
      }

      return allObjestWithData;
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
