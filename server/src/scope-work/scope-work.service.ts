import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { Objects } from 'src/objects/objects.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { User } from 'src/user/user.model';
import { CreateScopeWorkDto } from './dto/create-scope-work.dto';
import { UserScopeWork } from './user-scope-work.model';

@Injectable()
export class ScopeWorkService {
  constructor(
    @InjectModel(ScopeWork) private scopeWorkRepository: typeof ScopeWork,
    @InjectModel(UserScopeWork)
    private userScopeWorkRepository: typeof UserScopeWork,
    @InjectModel(TypeWork) private typeWorkRepository: typeof TypeWork,
    @InjectModel(ListNameWork)
    private listNameWorkRepository: typeof ListNameWork,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Objects) private objectsRepository: typeof Objects,
  ) {}

  private async checkArrUsers(arr: number[]) {
    try {
      let errUser: boolean = false;
      for (const item of arr) {
        const findedUser = await this.userRepository.findByPk(item);
        if (!findedUser) {
          errUser = true;
        }
      }
      return errUser;
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

  private async checkArrListNameWork(arr: number[]) {
    try {
      let errNameWork: boolean = false;

      for (const item of arr) {
        const findedNameWork = await this.listNameWorkRepository.findByPk(item);
        if (!findedNameWork) {
          errNameWork = true;
        }
      }

      return errNameWork;
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

  private async createArrUsers(arr: number[], scopeWorkId: number) {
    try {
      const scopeWork = await this.scopeWorkRepository.findByPk(scopeWorkId);
      for (const item of arr) {
        await scopeWork.$add('users', item);
      }
      return scopeWork;
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

  private async createArrListNameWork(arr: number[], scopeWorkId: number) {
    try {
      const scopeWork = await this.scopeWorkRepository.findByPk(scopeWorkId);
      for (const item of arr) {
        // const newTypeWorkId = await this.listNameWorkRepository.findByPk(item);

        // newTypeWorkId.scopeWorkId = scopeWork.id;
        // await newTypeWorkId.save();
        await scopeWork.$add('listNameWork', item);
      }
      return scopeWork;
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

  // Ссоздаём объём
  async createScopeWork(dto: CreateScopeWorkDto) {
    try {
      // Получаем id Объекта
      // Получаем id Типа работ
      // Получаем массив с id наименований работ
      // Получаем пользователей
      const { listNameWork, objectId, typeWorkId, users } = dto;
      // Проверяем существование
      const object = await this.objectsRepository.findByPk(objectId);
      if (!object) {
        throw new HttpException('Объект не найден', HttpStatus.NOT_FOUND);
      }
      const typeWork = await this.typeWorkRepository.findByPk(typeWorkId);
      if (!typeWork) {
        throw new HttpException('Тип работ не найден', HttpStatus.NOT_FOUND);
      }
      const isNameWork = await this.checkArrListNameWork(listNameWork);
      if (isNameWork) {
        throw new HttpException(
          'Списки работ не найдены',
          HttpStatus.NOT_FOUND,
        );
      }
      const isUser = await this.checkArrUsers(users);
      if (isUser) {
        throw new HttpException(
          'Пользователи не найдены',
          HttpStatus.NOT_FOUND,
        );
      }

      // Создание
      // Прикрепляем объект и создаём номер
      const newScopeWork = await this.scopeWorkRepository.create();
      newScopeWork.typeWorkId = typeWorkId;
      newScopeWork.objectId = objectId;
      await this.createArrUsers(users, newScopeWork.id);
      await this.createArrListNameWork(listNameWork, newScopeWork.id);
      await newScopeWork.save();

      const dataScopeWork = await this.scopeWorkRepository.findByPk(
        newScopeWork.id,
        { include: { all: true } },
      );
      return dataScopeWork;
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

  async getOneScopeWork(id: string) {
    try {
      const scopeWork = await this.scopeWorkRepository.findByPk(id, {
        include: { all: true },
      });
      const finishScopeWork = JSON.parse(JSON.stringify(scopeWork));
      if (!scopeWork) {
        throw new HttpException(
          'Такого объёма не существует',
          HttpStatus.NOT_FOUND,
        );
      }
      const { typeWorkId, objectId, listNameWork } = finishScopeWork;
      const findTypeWork = await this.typeWorkRepository.findByPk(typeWorkId);
      const findObject = await this.objectsRepository.findByPk(objectId);
      let findList = [];
      for (const item of listNameWork) {
        const { id } = item;
        const findedList = await this.listNameWorkRepository.findByPk(id, {
          include: { all: true },
        });
        findList.push(JSON.parse(JSON.stringify(findedList)));
      }
      const changedScopeWork = {
        ...finishScopeWork,
        object: findObject,
        typeWork: findTypeWork,
        listNameWork: findList,
      };

      return changedScopeWork;
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

  async getAllScopeWork() {
    try {
      const scopeWorks = await this.scopeWorkRepository.findAll({
        include: { all: true },
      });

      return scopeWorks;
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

  async getAllScopeWorkByUserId(id: string) {
    try {
      if (id === '1') {
        const getAllScopeWork = await this.userScopeWorkRepository.findAll({
          attributes: [
            [
              sequelize.fn('DISTINCT', sequelize.col('scopeWorkId')),
              'scopeWorkId',
            ],
          ],
        });

        const listScopeWork = [];
        for (const { scopeWorkId } of getAllScopeWork) {
          const findedScopeWork = await this.getOneScopeWork(
            scopeWorkId.toString(),
          );
          listScopeWork.push(findedScopeWork);
        }

        return listScopeWork;
      }
      const getAllScopeWork = await this.userScopeWorkRepository.findAll({
        where: {
          userId: id,
        },
      });

      const listScopeWork = [];
      for (const { scopeWorkId } of getAllScopeWork) {
        const findedScopeWork = await this.getOneScopeWork(
          scopeWorkId.toString(),
        );
        listScopeWork.push(findedScopeWork);
      }

      return listScopeWork;
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
