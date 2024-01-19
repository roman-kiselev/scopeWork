import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameWork } from 'src/name-work/name-work.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import {
  CreateNameListByNameDto,
  Item,
} from './dto/create-name-list-by-name.dto';
import { CreateNameListDto } from './dto/create-name-list.dto';
import { NameList } from './name-list.model';

@Injectable()
export class NameListService {
  constructor(
    @InjectModel(NameList) private nameListRepository: typeof NameList,
    @InjectModel(ListNameWork)
    private listNameWorkRepository: typeof ListNameWork,
    @InjectModel(NameWork) private nameWorkRepositiry: typeof NameWork,
    @InjectModel(TableAddingData)
    private tableAddingDataRepository: typeof TableAddingData,
  ) {}

  // Сооздание
  async create(dto: CreateNameListDto) {
    try {
      const { listNameWorkId, nameWorkId, quntity } = dto;
      console.log(listNameWorkId, nameWorkId, quntity);
      const newName = await this.nameListRepository.create({
        listNameWorkId,
        nameWorkId,
        quntity,
      });

      if (!newName) {
        throw new HttpException('Не удалось создать', HttpStatus.BAD_REQUEST);
      }
      return newName;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }

      throw new HttpException(
        'Ошибка сервера штука',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async edit(dto: CreateNameListDto) {
    try {
      const { listNameWorkId, quntity, nameWorkId } = dto;
      const updateName = await this.nameListRepository.findOne({
        where: {
          listNameWorkId,
          nameWorkId,
        },
      });

      updateName.quntity = quntity;
      const x = await updateName.save();
      if (!x) {
        return false;
      }
      return true;
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

  async del(dto: CreateNameListDto) {
    try {
      const { listNameWorkId, quntity, nameWorkId } = dto;
      const updateName = await this.nameListRepository.destroy({
        where: {
          listNameWorkId,
          nameWorkId,
        },
        force: true,
      });

      if (!updateName) {
        return false;
      }

      return true;
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

  async editArr(dto: CreateNameListDto[]) {
    try {
      const errArr = [];
      if (dto.length === 0) {
        return true;
      }
      for (const item of dto) {
        const candidate = await this.edit(item);

        if (!candidate) {
          errArr.push(item);
        }
      }
      if (errArr.length > 0) {
        throw new HttpException(
          'Не удалось обновить все данные',
          HttpStatus.BAD_REQUEST,
        );
      }
      return true;
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

  async delArr(dto: CreateNameListDto[]) {
    try {
      const errArr = [];
      if (dto.length === 0) {
        return true;
      }
      for (const item of dto) {
        const candidate = await this.del(item);
        if (!candidate) {
          errArr.push(item);
        }
      }
      if (errArr.length > 0) {
        return false;
      }
      return true;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Ошибка сервера ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createArr(dto: CreateNameListDto[]) {
    try {
      if (!Array.isArray(dto)) {
        throw new HttpException(
          'Некорректный формат данных',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (dto.length === 0) {
        return true; // Вернуть true, если массив пустой
      }

      const errArr = [];

      for (const item of dto) {
        if (typeof item !== 'object' || item === null) {
          throw new HttpException(
            'Некорректный формат данных',
            HttpStatus.BAD_REQUEST,
          );
        }

        const candidate = await this.create(item);
        if (!candidate) {
          errArr.push(item);
        }
      }
      if (errArr.length > 0) {
        throw new HttpException(
          'Не удалось создать некоторые элементы',
          HttpStatus.BAD_REQUEST,
        );
      }
      return true;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Ошибка сервера массив',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Создание по наименованию
  async createByName(dto: CreateNameListByNameDto) {
    try {
      const { typeWorkId, list, listNameWorkId } = dto;
      // Проверяем существование наименований по типам
      const checkList = Promise.all(
        list.map(async (item) => {
          const { id, name, quntity } = item;

          const newPosition = await this.create({
            listNameWorkId,
            nameWorkId: id,
            quntity: Number(quntity),
          });
          return newPosition;
        }),
      );

      return checkList;
      // Если всё верно начинаем создавать
      // передаём в create -> listNameWorkId, nameWorkId, quntity
      // !!! Передать как то процент загрузки !!!
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

  async getAll() {
    try {
      const names = await this.nameListRepository.findAll({
        include: { all: true },
      });
      return names;
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

  async editList(data: { dataNameWorks: NameWork[]; list: Item[] }) {
    try {
      const { dataNameWorks, list } = data;
      const findedListWork = await this.nameListRepository;
      // const newList = Promise.all(
      //   list.map(async (nameWork) => {
      //     const { id, name, quntity } = nameWork;
      //     const findName = dataNameWorks.find((name) => name.id === id);
      //     if (findName) {
      //       const newquntity = await this.nameListRepository.findByPk(findName)
      //     }
      //   }),
      // );
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

  async getDateByNameWorkIdAndListId(nameWorkId: number, listId: number) {
    try {
      // Ф. получает id Наименования и id списка
      const data = await this.nameListRepository.findAll({
        where: {
          nameWorkId,
          listNameWorkId: listId,
        },
        include: { all: true },
      });

      const arr = data.map((item) => {
        const {
          tableAddingData,
          id: nameListId,
          quntity,
          nameWorkId,
          listNameWorkId,
        } = item;

        const users = [];
        // Получим уникальные id пользователей что бы посчитать выполнение
        const uniqueUsers = [];
        const usersInTableAddingData = tableAddingData.map(
          (item) => item.userId,
        );
        for (let i = 0; i < usersInTableAddingData.length; i++) {
          const findedUser = uniqueUsers.find(
            (item) => item === usersInTableAddingData[i],
          );
          if (!findedUser) {
            uniqueUsers.push(usersInTableAddingData[i]);
          }
        }
        const sumEdit = tableAddingData
          .map((item) => Number(item.quntity))
          .reduce((currentSum, currentNumber) => currentSum + currentNumber, 0);
        // Подсчёт данных для пользователя
        for (let i = 0; i < uniqueUsers.length; i++) {
          const filterOneUser = tableAddingData.filter(
            (item) => item.userId === uniqueUsers[i],
          );
          const countUser = filterOneUser
            .map((item) => Number(item.quntity))
            .reduce(
              (currentSum, currentNumber) => currentSum + currentNumber,
              0,
            );

          users.push({
            userId: uniqueUsers[i],
            count: countUser,
            percent: ((countUser / quntity) * 100).toFixed(1),
            percentTwo: ((countUser / sumEdit) * 100).toFixed(1),
          });
        }

        return {
          nameListId,
          quntity,
          nameWorkId,
          listNameWorkId,
          count: sumEdit,
          percent: ((sumEdit / quntity) * 100).toFixed(1),
          tableAddingData,
          users,
        };
      });

      return arr;
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

  async getDataProgressByList(listId: number, scopeWorkId: number) {
    try {
      const listArr = await this.nameListRepository.findAll({
        where: {
          listNameWorkId: listId,
        },
      });

      let dataList = [];
      // Теперь получаем quntity и nameWorkId для получения изменений по этип спискам
      for (const list of listArr) {
        const { id: nameListId, nameWorkId, listNameWorkId, quntity } = list;
        // Теперь нужны данные из tableAddingdData - выполненые работы
        const addingTableForOneList =
          await this.tableAddingDataRepository.findAll({
            where: {
              nameListId,
              scopeWorkId,
            },
          });

        const cloneAddingTableForOneList = [...addingTableForOneList];
        const addingCount = cloneAddingTableForOneList
          .map((item) => Number(item.quntity))
          .reduce((currentItem, nextItem) => currentItem + nextItem, 0);

        dataList.push({
          listNameWorkId,
          nameListId,
          quntity,
          isDifference: addingCount > quntity ? true : false,
          quantityDifference: addingCount > quntity ? addingCount - quntity : 0,
          addingCount,
          percent: ((addingCount / quntity) * 100).toFixed(1),
        });
      }

      return dataList;
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

  // получение всех наименований работ для одного списка
  async getAllNameWorkByListId(id: number) {
    try {
      const list = await this.nameListRepository.findAll({
        where: {
          listNameWorkId: id,
        },
      });

      const listNames = [];
      for (const { nameWorkId, quntity, id } of list) {
        const nameWork = await this.nameWorkRepositiry.findByPk(nameWorkId, {
          raw: true,
        });
        listNames.push({
          ...nameWork,
          quntity,
          nameListId: id,
        });
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

  // Создаём список из excel документа
  async createListExcel(data: Item[]) {

  }
}
