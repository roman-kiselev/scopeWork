import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameListService } from 'src/name_list/name_list.service';
import { Objects } from 'src/objects/objects.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { User } from 'src/user/user.model';
import { CreateScopeWorkDto } from './dto/create-scope-work.dto';
import { EditScopeWorkDto } from './dto/edit-scope-work.dto';
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
    @InjectModel(TableAddingData)
    private tableAddingDataRepository: typeof TableAddingData,
    private nameListService: NameListService,
  ) {}

  private async getDataCount(arr: ScopeWork[]) {
    try {
      let dataProgress = [];
      const scopeWorkClone = [...arr];
      for (const scopeWork of scopeWorkClone) {
        const { id: idScopeWork, listNameWork } = scopeWork;
        const arr = [];
        for (const { id: listNameWorkId } of listNameWork) {
          const item = await this.nameListService.getDataProgressByList(
            listNameWorkId,
            idScopeWork,
          );
          const itemClone = [...item];
          const quntityNumber = itemClone
            .map((item) => item.quntity)
            .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
          const quantityDifferenceNumber = itemClone
            .map((item) => item.quantityDifference)
            .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
          const addingCountNumber = itemClone
            .map((item) => item.addingCount)
            .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
          const dataCount = {
            listNameWorkId,
            idScopeWork,
            quntity: quntityNumber,
            isDifference: itemClone.find((item) => item.isDifference === true)
              ? true
              : false,
            quantityDifference: quantityDifferenceNumber,
            addingCount: addingCountNumber,
            percent: ((addingCountNumber / quntityNumber) * 100).toFixed(1),
          };
          arr.push(dataCount);
        }
        const quntityMain = arr
          .map((item) => item.quntity)
          .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
        const addingCountMain = arr
          .map((item) => item.addingCount)
          .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
        const mainCountData = {
          listNameWorkId: arr.map((item) => item.listNameWorkId),
          idScopeWork: arr.map((item) => item.idScopeWork),
          quntity: quntityMain,
          isDifference: arr.find((item) => item.isDifference === true)
            ? true
            : false,
          quantityDifference: arr
            .map((item) => item.quantityDifference)
            .reduce((currentItem, nextItem) => currentItem + nextItem, 0),
          addingCount: addingCountMain,
          percent: ((addingCountMain / quntityMain) * 100).toFixed(1),
        };
        dataProgress.push({ ...scopeWork, ...mainCountData });
      }
      return dataProgress;
    } catch (e) {}
  }

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

  // Создаём объём
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
      let dataProgress = [];
      const scopeWorkClone = [...scopeWorks];

      // Расчитаем прогресс
      for (const scopeWork of scopeWorkClone) {
        const { id: idScopeWork, listNameWork } = scopeWork;
        const arr = [];
        for (const { id: listNameWorkId } of listNameWork) {
          const item = await this.nameListService.getDataProgressByList(
            listNameWorkId,
            idScopeWork,
          );
          const itemClone = [...item];
          const quntityNumber = itemClone
            .map((item) => item.quntity)
            .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
          const quantityDifferenceNumber = itemClone
            .map((item) => item.quantityDifference)
            .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
          const addingCountNumber = itemClone
            .map((item) => item.addingCount)
            .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
          const dataCount = {
            listNameWorkId,
            idScopeWork,
            quntity: quntityNumber,
            isDifference: itemClone.find((item) => item.isDifference === true)
              ? true
              : false,
            quantityDifference: quantityDifferenceNumber,
            addingCount: addingCountNumber,
            percent: ((addingCountNumber / quntityNumber) * 100).toFixed(1),
          };
          arr.push(dataCount);
        }
        const quntityMain = arr
          .map((item) => item.quntity)
          .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
        const addingCountMain = arr
          .map((item) => item.addingCount)
          .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
        const mainCountData = {
          listNameWorkId: arr.map((item) => item.listNameWorkId),
          idScopeWork: arr.map((item) => item.idScopeWork),
          quntity: quntityMain,
          isDifference: arr.find((item) => item.isDifference === true)
            ? true
            : false,
          quantityDifference: arr
            .map((item) => item.quantityDifference)
            .reduce((currentItem, nextItem) => currentItem + nextItem, 0),
          addingCount: addingCountMain,
          percent: ((addingCountMain / quntityMain) * 100).toFixed(1),
        };
        const jsonScopeWork = JSON.parse(JSON.stringify(scopeWork));
        dataProgress.push({ ...jsonScopeWork, ...mainCountData });
      }

      return dataProgress;
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

        const data = await this.getDataCount(listScopeWork);

        return data;
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
      const data = await this.getDataCount(listScopeWork);

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

  async getAllListWorkForEditByScopeWorkId(id: string) {
    try {
      // Получаем объём
      const scopeWork = await this.scopeWorkRepository.findByPk(id, {
        include: { all: true },
      });
      const scopeWorkFinish = JSON.parse(JSON.stringify(scopeWork));
      let listNames = [];
      const { listNameWork } = scopeWorkFinish;
      // Получаем весь список наименований
      // Учесть что списков с работами может быть несколько
      for (const { id: idListNameWork } of listNameWork) {
        const oneList = await this.listNameWorkRepository.findByPk(
          idListNameWork,
          {
            include: { all: true },
          },
        );

        const { nameWorks } = oneList;
        const finishNameWorks = JSON.parse(JSON.stringify(nameWorks));
        for (const { id: nameWorkId, name, NameList } of finishNameWorks) {
          const findedData =
            await this.nameListService.getDateByNameWorkIdAndListId(
              nameWorkId,
              idListNameWork,
            );

          const newFindedData = findedData.map((item) => {
            return {
              ...item,
              scopeWorkId: id,
              name,
            };
          });

          listNames = [...listNames, ...newFindedData];
        }
      }

      return listNames;
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

  // Редактировать объём
  async editScopeWork(dto: EditScopeWorkDto) {
    try {
      const { listNameWork, objectId, typeWorkId, users, scopeWorkId } = dto;
      const scopeWork = await this.scopeWorkRepository.findByPk(scopeWorkId);

      await this.createArrUsers(users, scopeWork.id);
      await this.createArrListNameWork(listNameWork, scopeWork.id);
      const dataScopeWork = await this.scopeWorkRepository.findByPk(
        scopeWork.id,
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
}
