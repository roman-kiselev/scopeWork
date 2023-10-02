import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { Objects } from 'src/objects/objects.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { User } from 'src/user/user.model';
import { CreateScopeWorkDto } from './dto/create-scope-work.dto';
import { ScopeWork } from './scope-work.model';

@Injectable()
export class ScopeWorkService {
  constructor(
    @InjectModel(ScopeWork) private scopeWorkRepository: typeof ScopeWork,
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
        await scopeWork.$set('users', item);
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
        await scopeWork.$set('listNameWork', item);
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
      await this.createArrListNameWork(users, newScopeWork.id);
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

  // async createScopeWork(idObjectTypeWork: number) {
  //   try {
  //     console.log(idObjectTypeWork);
  //     // Проверить существует ли тип работ
  //     const isObjectTypeWork = await this.objectTypeWorkRepository.findByPk(
  //       idObjectTypeWork,
  //     );
  //     if (!isObjectTypeWork) {
  //       throw new HttpException('Связи не существует', HttpStatus.BAD_REQUEST);
  //     }
  //     const scopeWork = await this.scopeWorkRepository.create({
  //       objectTypeWorkId: idObjectTypeWork,
  //     });

  //     if (!scopeWork) {
  //       throw new HttpException('Не удалось создать', HttpStatus.BAD_REQUEST);
  //     }
  //     await scopeWork.update({
  //       value: scopeWork.id,
  //     });
  //     // await scopeWork.$add('objectTypeWorkId', idObjectTypeWork);

  //     return scopeWork;
  //   } catch (e) {
  //     if (e instanceof HttpException) {
  //       throw e;
  //     }
  //     throw new HttpException(
  //       'Ошибка сервера',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // // Создаём объём, добавляем просто номер
  // // В дальнейшем можно прикрепить подобъём, тип работ, объект
  // async create(idTypeWork: number) {
  //   try {
  //     // Проверяем тип работ
  //     const typeWork = await this.typeWorkRepository.findByPk(idTypeWork);
  //     if (!typeWork) {
  //       throw new HttpException(
  //         'Такого типа не существует',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     const scopeWork = await this.scopeWorkRepository.create();
  //     await scopeWork.update({
  //       value: scopeWork.id,
  //       typeWorkId: idTypeWork,
  //     });
  //     const getScopeWork = await this.scopeWorkRepository.findByPk(
  //       scopeWork.id,
  //     );

  //     return getScopeWork;
  //   } catch (e) {
  //     if (e instanceof HttpException) {
  //       throw e;
  //     }
  //     throw new HttpException(
  //       'Ошибка сервера',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // async getAllScopeWork() {
  //   try {
  //     const scopeWorks = await this.scopeWorkRepository.findAll({
  //       include: { all: true },
  //     });
  //     return scopeWorks;
  //   } catch (e) {
  //     if (e instanceof HttpException) {
  //       throw e;
  //     }
  //     throw new HttpException(
  //       'Ошибка сервера',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
