import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as ExcelJS from 'exceljs';
import sequelize, { QueryTypes } from 'sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameListService } from 'src/name_list/name_list.service';
import { Objects } from 'src/objects/objects.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { User } from 'src/user/user.model';
import * as stream from 'stream';
import { CreateScopeWorkDto } from './dto/create-scope-work.dto';
import { EditScopeWorkDto } from './dto/edit-scope-work.dto';
import { HistoryTimelineDto } from './dto/history-timeline.dto';
import { IScopeworkShort } from './interfaces/IScopeworkShort';
import { ResHistoryTimeline } from './interfaces/ResHistoryTimeline';
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

  private async editArrUsers(arr: number[], scopeWorkId: number) {
    try {
      console.log(arr);
      // Отсортируем массив
      // Получим для начала уже существующий массив
      const scopeWork = await this.scopeWorkRepository.findByPk(scopeWorkId, {
        include: [
          {
            model: User,
          },
        ],
      });

      const { users } = scopeWork;
      // Есть 2 массива
      // Нужно найти id которые отсутствуют в scopeWork => users и добавить
      const arrUsersId = users.map((item) => item.id);
      // Проходим для добавления

      for (const item of arr) {
        const findedId = arrUsersId.find((user) => user === item);
        if (!findedId) {
          await scopeWork.$add('users', item);
        }
      }

      for (const item of arrUsersId) {
        const findedId = arr.find((user) => user === item);
        if (!findedId) {
          await scopeWork.$remove('users', item);
        }
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

  // Получение статистики
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

        for (const {
          id: nameWorkId,
          name,
          unitId,
          NameList,
        } of finishNameWorks) {
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
              unitId,
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

      // const arr = await this.editArrUsers(users, scopeWorkId);
      await this.editArrUsers(users, scopeWork.id);
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

  async getAllScopeWorkSqlShort(id: string) {
    try {
      const query = `
      SELECT 
      sw.id,
      sw.deletedAt,
      tw.name as nameTypework,
      obj.name AS nameObject ,
      SUM(sumSw.t1Quntity) AS sum,
      SUM(sumSw.t2Quntity) AS sumCurrent,
      ROUND(sumSw.t2Quntity / sumSw.t1Quntity * 100, 2) as percent
  FROM
      scopework.scope_work AS sw
          INNER JOIN
      (SELECT 
          scopework.\`scope_work\`.id AS scope_workId,
              SUM(t1.quntity) AS t1Quntity,
              SUM(t2.quntitySum) AS t2Quntity
      FROM
          scopework.\`scope_work\`
      LEFT JOIN scopework.\`list_name_work\` lnw ON lnw.scopeWorkId = scopework.\`scope_work\`.id
      LEFT JOIN (SELECT 
          listNameWorkId, ROUND(SUM(quntity), 1) AS quntity
      FROM
          scopework.\`name-list\`
      GROUP BY scopework.\`name-list\`.listNameWorkId) t1 ON t1.listNameWorkId = lnw.id
      LEFT JOIN (SELECT 
          SUM(tad.quntity) AS quntitySum,
              nl.listNameWorkId AS listNameWorkId
      FROM
          scopework.\`table-adding-data\` tad
      LEFT JOIN scopework.\`name-list\` nl ON nl.id = tad.nameListId
      WHERE
          tad.deletedAt IS NULL
      GROUP BY listNameWorkId) t2 ON t2.listNameWorkId = lnw.id
      GROUP BY scopework.\`scope_work\`.id) sumSw ON sumSw.scope_workId = sw.id
          INNER JOIN
      scopework.type_work tw ON tw.id = sw.typeWorkId
          INNER JOIN
      scopework.objects obj ON obj.id = sw.objectId
  GROUP BY id; 
      `;

      const query2 = `
      SELECT 
      sw.id,
      sw.deletedAt,
      sw.nameTypework,
      sw.nameObject,
      sw.sum,
      sw.sumCurrent,
      sw.percent
  FROM
      scopework.\`user-scope-work\` usw
          INNER JOIN
      (SELECT 
          sw.id,
              sw.deletedAt,
              tw.name AS nameTypework,
              obj.name AS nameObject,
              SUM(sumSw.t1Quntity) AS sum,
              SUM(sumSw.t2Quntity) AS sumCurrent,
              ROUND(sumSw.t2Quntity / sumSw.t1Quntity * 100, 2) AS percent
      FROM
          scopework.scope_work AS sw
      LEFT JOIN (SELECT 
          scopework.\`scope_work\`.id AS scope_workId,
              SUM(t1.quntity) AS t1Quntity,
              SUM(t2.quntitySum) AS t2Quntity
      FROM
          scopework.\`scope_work\`
      LEFT JOIN scopework.\`list_name_work\` lnw ON lnw.scopeWorkId = scopework.\`scope_work\`.id
      LEFT JOIN (SELECT 
          listNameWorkId, ROUND(SUM(quntity), 1) AS quntity
      FROM
          scopework.\`name-list\`
      GROUP BY scopework.\`name-list\`.listNameWorkId) t1 ON t1.listNameWorkId = lnw.id
      LEFT JOIN (SELECT 
          SUM(tad.quntity) AS quntitySum,
              nl.listNameWorkId AS listNameWorkId
      FROM
          scopework.\`table-adding-data\` tad
      LEFT JOIN scopework.\`name-list\` nl ON nl.id = tad.nameListId
      WHERE
          tad.deletedAt IS NULL
      GROUP BY listNameWorkId) t2 ON t2.listNameWorkId = lnw.id
      GROUP BY scopework.\`scope_work\`.id) sumSw ON sumSw.scope_workId = sw.id
      INNER JOIN scopework.type_work tw ON tw.id = sw.typeWorkId
      INNER JOIN scopework.objects obj ON obj.id = sw.objectId
      GROUP BY id) sw ON sw.id = usw.scopeWorkId
  WHERE
      userId = :userId;
      `;
      const replacements = {
        userId: id,
      };

      const data: IScopeworkShort[] =
        await this.scopeWorkRepository.sequelize.query(query2, {
          type: QueryTypes.SELECT,
          replacements,
        });

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

  async getHistoryTimeline(dto: HistoryTimelineDto) {
    try {
      console.log(dto);
      const query = `
      SELECT *
      FROM scopework.\`table-adding-data\` tad
      WHERE tad.scopeWorkId = :idScopeWork AND tad.createdAt BETWEEN :dateFrom AND :dateTo AND tad.deletedAt IS NULL
      ORDER BY tad.createdAt ASC;
      `;
      const query2 = `
      SELECT 
	tad.scopeWorkId as scopeWorkId,
    tad.nameListId as nameListId,
    CONCAT(ud.lastname, " " ,ud.firstname) as userName,
    SUM(tad.quntity) as quntity,
    sw.name as nameTypeWork,
    nw.name as nameWork,
    nw.unitName as unitName
FROM
    scopework.\`table-adding-data\` tad
    INNER JOIN (
		SELECT 
			sw.id as id,
			tw.name
        FROM scopework.scope_work sw
        INNER JOIN
        scopework.type_work tw ON tw.id  = sw.typeWorkId
    ) sw ON sw.id = tad.scopeWorkId
    INNER JOIN (
		SELECT 
			scopework.\`name_work\`.id as id,
            scopework.\`name_work\`.name as name,
            u.name as unitName
		FROM scopework.\`name_work\`
        INNER JOIN 
        scopework.unit u ON u.id = scopework.\`name_work\`.unitId
    ) nw ON nw.id = tad.nameWorkId
    INNER JOIN
    scopework.\`user-description\` ud ON ud.userId = tad.userId
WHERE
    tad.scopeWorkId = :idScopeWork
        AND tad.createdAt BETWEEN :dateFrom AND :dateTo
        AND tad.deletedAt IS NULL
        AND tad.quntity IS NOT NULL
GROUP BY nameWork
ORDER BY nameWork ASC;
      `;
      const replacements = {
        idScopeWork: dto.idScopeWork,
        dateFrom: dto.dateFrom,
        dateTo: dto.dateTo,
      };
      const data: ResHistoryTimeline[] =
        await this.scopeWorkRepository.sequelize.query(query2, {
          type: QueryTypes.SELECT,
          replacements,
        });

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

  async createExcelForScopeWork(
    dto: HistoryTimelineDto,
  ): Promise<stream.Readable> {
    try {
      //
      const data = await this.getHistoryTimeline(dto);
      if (data) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        // Добявляем заголовки
        worksheet.addRow([
          '№ Объёма',
          'Тип работ',
          'Пользователь',
          'Наименование',
          'Количество',
          'Ед.',
        ]);
        data.forEach((item) => {
          worksheet.addRow([
            item.scopeWorkId,
            item.nameTypeWork,
            item.userName,
            item.nameWork,
            item.quntity,
            item.unitName,
          ]);
        });
        // Создаем поток для записи данных в файл
        const streamEx = new stream.PassThrough();

        await workbook.xlsx.write(streamEx);
        streamEx.end();

        return streamEx;
      }
      throw new HttpException('Нет данных', HttpStatus.BAD_REQUEST);
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
