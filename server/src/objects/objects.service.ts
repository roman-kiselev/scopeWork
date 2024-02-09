import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameList } from 'src/name_list/name-list.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { TypeWorkService } from 'src/type-work/type-work.service';
import { User } from 'src/user/user.model';
import { CreateAssignDto } from './dto/create-assign.dto';
import { CreateObjectDto } from './dto/create-object.dto';
import { IListNamesWithData } from './interfaces/IListNamesWithData';
import { IOneScopeWorkWithData } from './interfaces/IOneScopeWorkWithData';
import { Objects } from './objects.model';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectModel(Objects) private objectsRepository: typeof Objects,
    @InjectModel(TypeWork) private typeWorkRepository: typeof TypeWork,
    @InjectModel(ScopeWork) private scopeWorkRepository: typeof ScopeWork,
    @InjectModel(NameList) private nameListRepository: typeof NameList,
    @InjectModel(TableAddingData)
    private tableAddingDataRepository: typeof TableAddingData,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(ListNameWork)
    private listNameWorkRepository: typeof ListNameWork,
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
      // Проверяем существование объекта и типа работ
      const isType = await this.typeWorkRepository.findOne({
        where: {
          id: dto.idTypeWork,
        },
      });

      const isObject = await this.objectsRepository.findOne({
        rejectOnEmpty: undefined,
        where: {
          id: dto.idObject,
        },
      });

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

  // Получим один объект
  async getOneObject(id: number) {
    try {
      const oneObject = await this.objectsRepository.findByPk(id, {
        include: { all: true },
      });
      return oneObject;
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

  // Получим пользователей по id объекта
  private async getUsersByObjectId(idObject: number) {
    try {
      const { scopeWorks } = await this.getOneObject(idObject);
      const scopeWorksIdArr: number[] = scopeWorks.map((item) => item.id);
      // теперь получим пользователей которые закреплены за объектом
      // и пользователи которые учавствовали в работах
      // так же получим историю внесённых изменений
      const pinnedUser: User[] = [];
      const notAssignedUser = [];
      // Перебираем и добавляем закреплённых пользователей на объекте
      for (const item of scopeWorksIdArr) {
        const { users } = await this.scopeWorkRepository.findByPk(item, {
          include: [
            {
              model: User,
            },
          ],
        });
        users.forEach((user) => {
          const findedUser = pinnedUser.find((item) => item.id === user.id);
          if (!findedUser) {
            pinnedUser.push(user);
          }
        });
      }
      // Теперь получаем пользователей которых открепили от объекта
      // Для начала получим список участвующих на объекте
      const users = await this.tableAddingDataRepository.findAll({
        where: {
          [Op.or]: scopeWorksIdArr.map((id) => {
            return {
              scopeWorkId: Sequelize.literal(`"${id}"`),
            };
          }),
        },
        attributes: ['userId'],
        group: ['userId'],
      });
      for (const { userId } of users) {
        const findedUser = pinnedUser.find((item) => item.id === userId);
        if (!findedUser) {
          const user = await this.userRepository.findByPk(userId);
          notAssignedUser.push(user);
        }
      }

      return { pinnedUser, notAssignedUser };
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

  // Получим процент выполнения для каждого пользователя на объекте
  // 1. Общий процент выполнения
  // 2. Количество наименований
  // 3. Количество общее количество
  // 4. Процент по каждому наименованию и список

  private async getFullDataForOneScopeWork(
    idScopeWork: number,
    userIdArr?: number[],
  ) {
    try {
      // Получим объём
      const scopeWork = await this.scopeWorkRepository.findByPk(idScopeWork, {
        include: [
          {
            model: ListNameWork,
          },
          {
            model: TableAddingData,
          },
        ],
      });

      // Для начала нужно получить общее количество по объёму
      const listNameWorkArr = await this.listNameWorkRepository.findAll({
        where: {
          [Op.or]: scopeWork.listNameWork.map(({ id }) => {
            return {
              id: id,
            };
          }),
        },
        include: { all: true },
      });
      const nameWorksArr = [];
      listNameWorkArr.forEach((item) => {
        const { nameWorks } = item;
        for (const item of nameWorks) {
          const finishItem = JSON.parse(JSON.stringify(item));
          nameWorksArr.push({
            id: finishItem.id,
            name: finishItem.name,
            deletedAt: finishItem.deletedAt,
            createdAt: finishItem.createdAt,
            updatedAt: finishItem.updatedAt,
            unitId: finishItem.unitId,
            nameListId: finishItem.NameList.id,
            quntity: finishItem.NameList.quntity,
          });
        }
      });

      const { tableAddingData } = scopeWork;
      // общее количество
      const countListNameWorksArr: number = nameWorksArr
        .map((item) => item.quntity)
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
      // Количество внесённых изменений
      const countTableAddingData: number = tableAddingData
        .map((item) => item.quntity)
        .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
      // Получим процент выполнения
      const percentOneScopeWork: string = (
        (countTableAddingData * 100) /
        countListNameWorksArr
      ).toFixed(1);

      const listNamesWithData: IListNamesWithData[] = [];
      for (const item of nameWorksArr) {
        const { nameListId } = item;
        let userAdding = [];
        for (const item of userIdArr) {
          const tableAddingUser = await this.tableAddingDataRepository.findAll({
            where: {
              scopeWorkId: idScopeWork,
              nameListId,
              userId: item,
              deletedAt: null,
            },
            attributes: [
              [Sequelize.fn('SUM', Sequelize.col('quntity')), 'quntity'],
              'userId',
              'nameListId',
              'scopeWorkId',
            ],
          });

          userAdding = [
            ...userAdding,
            ...tableAddingUser.filter(({ userId }) => userId !== null),
          ];
        }

        const finishUserAdding = userAdding.map((oneUser) => {
          return {
            quntity: oneUser.quntity,
            percentForOneName: ((oneUser.quntity * 100) / item.quntity).toFixed(
              1,
            ),
            userId: oneUser.userId,
            nameListId: oneUser.nameListId,
            scopeWorkId: oneUser.scopeWorkId,
          };
        });
        listNamesWithData.push({
          ...item,
          finishUserAdding,
        });
      }

      // Теперь сделаем подсчёт по пользователям

      return {
        countListNameWorksArr,
        countTableAddingData,
        percentOneScopeWork,
        listNamesWithData,
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

  private async getFullDataForObject(idObject: number) {
    try {
      const { scopeWorks } = await this.getOneObject(idObject);
      const { pinnedUser, notAssignedUser } = await this.getUsersByObjectId(
        idObject,
      );
      const pinnedUserId = pinnedUser.map((item) => item.id);
      const notAssignedUserId = notAssignedUser.map((item) => item.id);
      const usersId = [...pinnedUserId, ...notAssignedUserId];
      const data: IOneScopeWorkWithData[] = [];
      for (const item of scopeWorks) {
        const { id } = item;
        const finishItem = JSON.parse(JSON.stringify(item));
        const dataOneScopeWork = await this.getFullDataForOneScopeWork(
          id,
          usersId,
        );

        let finishUserAddingMain = [];
        const usersIdArr = [];
        const { countListNameWorksArr } = dataOneScopeWork;

        for (const item of dataOneScopeWork.listNamesWithData) {
          const { finishUserAdding } = item;

          finishUserAdding.forEach((item) => {
            finishUserAddingMain.push({
              quntity: item.quntity,
              percentMain: (
                (Number(item.quntity) * 100) /
                countListNameWorksArr
              ).toFixed(1),
              userId: item.userId,
            });
          });

          finishUserAdding.forEach((item) => {
            if (!usersIdArr.includes(item.userId)) {
              usersIdArr.push(item.userId);
            }
          });
        }
        let arr = [];
        for (const item of usersIdArr) {
          const filterUser = finishUserAddingMain
            .filter((user) => user.userId === item)
            .map((item) => Number(item.quntity))
            .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
          arr = [
            ...arr,
            {
              userId: item,
              quntity: filterUser,
              percent: (
                (Number(filterUser) * 100) /
                countListNameWorksArr
              ).toFixed(2),
            },
          ];
        }

        data.push({
          ...finishItem,
          listUsersData: arr,
          ...dataOneScopeWork,
        });
      }

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

  // Получим все объёмы работ с информацией
  async getAllScopeWorksWithFullData(idObject: number) {
    try {
      const object = await this.getOneObject(idObject);

      const objectData: IOneScopeWorkWithData[] =
        await this.getFullDataForObject(idObject);

      let countListNameWorksObject = 0;
      let countTableAddingDataObject = 0;
      let mainListUserWithRepeats = [];
      // Подсчитаем данные для объекта
      for (const item of objectData) {
        const { countListNameWorksArr, countTableAddingData, listUsersData } =
          item;
        mainListUserWithRepeats = [
          ...mainListUserWithRepeats,
          ...listUsersData,
        ];
        countListNameWorksObject =
          countListNameWorksObject + countListNameWorksArr;
        countTableAddingDataObject =
          countTableAddingDataObject + countTableAddingData;
      }
      // Теперь нужно избавиться от повторов в mainListUserWithRepeats
      let uniqueUserId = [
        ...new Set(mainListUserWithRepeats.map((item) => item.userId)),
      ];
      let mainListUserNoRepetitions = [];
      for (const item of uniqueUserId) {
        const filterUser = mainListUserWithRepeats
          .filter((user) => user.userId === item)
          .map((item) => Number(item.quntity))
          .reduce((currentItem, nextItem) => currentItem + nextItem, 0);
        mainListUserNoRepetitions = [
          ...mainListUserNoRepetitions,
          {
            userId: item,
            quntity: filterUser,
            percent: (
              (Number(filterUser) * 100) /
              countListNameWorksObject
            ).toFixed(2),
          },
        ];
      }

      return {
        id: object.id,
        name: object.name,
        address: object.address,
        deletedAt: object.deletedAt,
        createdAt: object.createdAt,
        countListNameWorksObject,
        countTableAddingDataObject,
        mainListUserNoRepetitions,
        objectData,
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
}
