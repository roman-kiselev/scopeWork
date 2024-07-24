import {
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import * as ExcelJS from 'exceljs';
import { firstValueFrom } from 'rxjs';
import sequelize, { QueryTypes } from 'sequelize';
import { DatabaseService } from 'src/database/database.service';
import { ListNameWorkService } from 'src/list-name-work/list-name-work.service';
import { NameListService } from 'src/name_list/name_list.service';
import { IListNamesWithData } from 'src/objects/interfaces/IListNamesWithData';
import { ObjectsService } from 'src/objects/objects.service';
import { TableAddingDataService } from 'src/table-adding-data/table-adding-data.service';
import { TypeWorkService } from 'src/type-work/type-work.service';
import * as stream from 'stream';
import { CreateScopeWorkDto } from './dto/create-scope-work.dto';
import { EditScopeWorkDto } from './dto/edit-scope-work.dto';
import { GetOneBy } from './dto/get-one-by.dto';
import { HistoryTimelineDto } from './dto/history-timeline.dto';
import { ScopeWork } from './entities/scope-work.model';
import { UserScopeWork } from './entities/user-scope-work.model';
import { IResQuickOneScopeWorkById } from './interfaces/IResQuickOneScopeWorkById';
import { IResScopeWorkByUserAndObject } from './interfaces/IResScopeWorkByUserAndObject';
import { IScopeworkShort } from './interfaces/IScopeworkShort';
import { ResHistoryTimeline } from './interfaces/ResHistoryTimeline';

@Injectable()
export class ScopeWorkService {
    constructor(
        @InjectModel(ScopeWork) private scopeWorkRepository: typeof ScopeWork,
        @InjectModel(UserScopeWork)
        private userScopeWorkRepository: typeof UserScopeWork,
        @Inject('USER_MAIN_SERVICE') private readonly clientUsers: ClientProxy,
        private readonly listNameWorkService: ListNameWorkService,
        private readonly tableAddingDataService: TableAddingDataService,
        private readonly objectService: ObjectsService,
        private readonly databaseService: DatabaseService,
        private readonly nameListService: NameListService,
        private readonly typeWorkService: TypeWorkService,
    ) {}

    async getScopeWorkBy(
        dto: GetOneBy,
        organizationId: number,
        params: { withDelete?: boolean } = {},
    ) {
        const scopeWork = await this.scopeWorkRepository.findOne({
            where: {
                ...dto.criteria,
                organizationId,
                deletedAt: params.withDelete ? params.withDelete : null,
            },
            include: dto.relations || [],
        });
        if (!scopeWork) {
            throw new NotFoundException(
                'ScopeWork with this criteria not found',
            );
        }
        return scopeWork;
    }

    /**
     * Метод делает подсчёт для одного объёма.
     * {
     * "countListNameWorksArr": 3227,
     * "countTableAddingData": 3188,
     * "percentOneScopeWork": "98.8",
     * "listNamesWithData": [
     *  {
     *    "id": 1,
     *    "name": "Установка подоконного приточного клапана Домвент Оптима",
     *    "deletedAt": "null",
     *    "createdAt": "2024-02-06T08:44:53.000Z",
     *    "updatedAt": "2024-02-06T08:44:53.000Z",
     *    "unitId": 1,
     *    "nameListId": 1,
     *    "quntity": 138,
     *    "finishUserAdding": [
     *      {
     *        "quntity": 138,
     *        "percentForOneName": "100.0",
     *        "userId": 2,
     *        "nameListId": 1,
     *        "scopeWorkId": 2
     *      }
     *    ]
     *  },
     * @returns Возвращает итог подсчёта
     */
    async getFullDataForOneScopeWork(
        idScopeWork: number,
        organizationId: number,
        userIdArr?: number[],
    ) {
        const scopeWork = await this.getScopeWorkBy(
            {
                criteria: { id: idScopeWork },
                relations: ['listNameWork', 'tableAddingData'],
            },
            organizationId,
        );
        // TODO желательно исправить метод
        const listNameWorkArr = await this.listNameWorkService.getListTest(
            scopeWork.listNameWork.map((item) => item.id),
        );
        const arr = listNameWorkArr.map((item) => item.nameWorks).flat();
        const nameWorksArr = arr.map((item) => {
            return {
                id: item.id,
                name: item.name,
                deletedAt: item.deletedAt,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                unitId: item.unitId,
                nameListId: item['NameList'].id,
                quntity: item['NameList'].quntity,
            };
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
                // TODO этот метод тоже требует исправления
                // Здесь куча запросов, нужно оптимизировать
                const tableAddingUser =
                    await this.tableAddingDataService.getAnything(
                        idScopeWork,
                        nameListId,
                        item,
                    );

                userAdding = [
                    ...userAdding,
                    ...tableAddingUser.filter(({ userId }) => userId !== null),
                ];
            }

            const finishUserAdding = userAdding.map((oneUser) => {
                return {
                    quntity: oneUser.quntity,
                    percentForOneName: (
                        (oneUser.quntity * 100) /
                        item.quntity
                    ).toFixed(1),
                    userId: oneUser.userId,
                    nameListId: oneUser.nameListId,
                    scopeWorkId: oneUser.scopeWorkId,
                };
            });
            listNamesWithData.push({
                ...item,
                deletedAt: `${item.deletedAt}`,
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
        //return testArr;
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    private async _getDataCount(arr: ScopeWork[]) {
        let dataProgress = [];

        for (const scopeWork of arr) {
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
                    .reduce(
                        (currentItem, nextItem) => currentItem + nextItem,
                        0,
                    );
                const quantityDifferenceNumber = itemClone
                    .map((item) => item.quantityDifference)
                    .reduce(
                        (currentItem, nextItem) => currentItem + nextItem,
                        0,
                    );
                const addingCountNumber = itemClone
                    .map((item) => item.addingCount)
                    .reduce(
                        (currentItem, nextItem) => currentItem + nextItem,
                        0,
                    );
                const dataCount = {
                    listNameWorkId,
                    idScopeWork,
                    quntity: quntityNumber,
                    isDifference: itemClone.find(
                        (item) => item.isDifference === true,
                    )
                        ? true
                        : false,
                    quantityDifference: quantityDifferenceNumber,
                    addingCount: addingCountNumber,
                    percent: (
                        (addingCountNumber / quntityNumber) *
                        100
                    ).toFixed(1),
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
                    .reduce(
                        (currentItem, nextItem) => currentItem + nextItem,
                        0,
                    ),
                addingCount: addingCountMain,
                percent: ((addingCountMain / quntityMain) * 100).toFixed(1),
            };

            dataProgress.push({ ...scopeWork, ...mainCountData });
        }
        return dataProgress;
    }
    private async getDataCount(arr: ScopeWork[]) {
        const dataProgress = [];

        for (const scopeWork of arr) {
            let quntityMain = 0;
            let addingCountMain = 0;
            const dataCounts = [];

            for (const { id: listNameWorkId } of scopeWork.listNameWork) {
                const item = await this.nameListService.getDataProgressByList(
                    listNameWorkId,
                    scopeWork.id,
                );

                const quntityNumber = item.reduce(
                    (acc, cur) => acc + cur.quntity,
                    0,
                );
                const quantityDifferenceNumber = item.reduce(
                    (acc, cur) => acc + cur.quantityDifference,
                    0,
                );
                const addingCountNumber = item.reduce(
                    (acc, cur) => acc + cur.addingCount,
                    0,
                );
                const isDifference = item.some((item) => item.isDifference);

                quntityMain += quntityNumber;
                addingCountMain += addingCountNumber;

                const percent = (
                    (addingCountNumber / quntityNumber) *
                    100
                ).toFixed(1);

                dataCounts.push({
                    listNameWorkId,
                    idScopeWork: scopeWork.id,
                    quntity: quntityNumber,
                    isDifference,
                    quantityDifference: quantityDifferenceNumber,
                    addingCount: addingCountNumber,
                    percent,
                });
            }

            const mainCountData = {
                listNameWorkId: dataCounts.map((item) => item.listNameWorkId),
                idScopeWork: scopeWork.id,
                quntity: quntityMain,
                isDifference: dataCounts.some((item) => item.isDifference),
                quantityDifference: dataCounts.reduce(
                    (acc, cur) => acc + cur.quantityDifference,
                    0,
                ),
                addingCount: addingCountMain,
                percent: ((addingCountMain / quntityMain) * 100).toFixed(1),
            };

            dataProgress.push({ ...scopeWork, ...mainCountData });
        }

        return dataProgress;
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    private async checkArrUsers(arr: number[]) {
        try {
            let errUser: boolean = false;
            for (const item of arr) {
                const findedUser = await firstValueFrom(
                    this.clientUsers.send('test-test', item),
                );
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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    private async checkArrListNameWork(arr: number[], organizationId: number) {
        let errNameWork: boolean = false;

        for (const item of arr) {
            const findedNameWork = await this.listNameWorkService.getOneBy(
                {
                    criteria: {
                        id: item,
                    },
                    relations: [],
                },
                organizationId,
            );
            if (!findedNameWork) {
                errNameWork = true;
            }
        }

        return errNameWork;
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    private async createArrUsers(arr: number[], scopeWorkId: number) {
        try {
            const scopeWork = await this.scopeWorkRepository.findByPk(
                scopeWorkId,
            );
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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    private async editArrUsers(arr: number[], scopeWorkId: number) {
        try {
            console.log(arr);
            // Отсортируем массив
            // Получим для начала уже существующий массив
            const scopeWork = await this.scopeWorkRepository.findByPk(
                scopeWorkId,
                {
                    // TODO внести изменения
                    // include: [
                    //     {
                    //         model: User,
                    //     },
                    // ],
                },
            );

            // const { users } = scopeWork;
            //  TODO изменения нужно внести, ошибка users
            // const { users } = scopeWork;
            // // Есть 2 массива
            // // Нужно найти id которые отсутствуют в scopeWork => users и добавить
            // const arrUsersId = users.map((item) => item.id);
            // // Проходим для добавления

            // for (const item of arr) {
            //     const findedId = arrUsersId.find((user) => user === item);
            //     if (!findedId) {
            //         await scopeWork.$add('users', item);
            //     }
            // }

            // for (const item of arrUsersId) {
            //     const findedId = arr.find((user) => user === item);
            //     if (!findedId) {
            //         await scopeWork.$remove('users', item);
            //     }
            // }

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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    private async createArrListNameWork(arr: number[], scopeWorkId: number) {
        try {
            const scopeWork = await this.scopeWorkRepository.findByPk(
                scopeWorkId,
            );
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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    // Создаём объём
    async createScopeWork(dto: CreateScopeWorkDto, organizationId: number) {
        try {
            // Получаем id Объекта
            // Получаем id Типа работ
            // Получаем массив с id наименований работ
            // Получаем пользователей
            const { listNameWork, objectId, typeWorkId, users } = dto;
            // Проверяем существование
            // const object = await this.objectsRepository.findByPk(objectId);
            const object = await this.objectService.getOneBy(
                { criteria: { id: objectId }, relations: [] },
                organizationId,
            );
            if (!object) {
                throw new HttpException(
                    'Объект не найден',
                    HttpStatus.NOT_FOUND,
                );
            }
            // const typeWork = await this.typeWorkRepository.findByPk(typeWorkId);
            const typeWork = await this.typeWorkService.getOneBy(
                {
                    criteria: { id: typeWorkId },
                    relations: [],
                },
                organizationId,
            );
            if (!typeWork) {
                throw new HttpException(
                    'Тип работ не найден',
                    HttpStatus.NOT_FOUND,
                );
            }
            const isNameWork = await this.checkArrListNameWork(
                listNameWork,
                organizationId,
            );
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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    // Получение списка работ по id пользователя и объекта
    async getScopeWorkByUserIdAndObjectId(dto: {
        userId: string;
        objectId: string;
    }) {
        try {
            const query = `
      SELECT 
      sw.id AS id,
      sw.typeWorkId AS typeWorkId,
      tw.name AS nameTypeWork,
      sw.objectId AS objectId,
      so.name AS name,
      swu.userId AS userId,
      swu.scopeWorkId AS scopeWorkId
  FROM
      \`scopework\`.scope_work sw
          INNER JOIN
      \`scopework\`.\`user-scope-work\` swu ON swu.scopeWorkId = sw.id
          INNER JOIN
      \`scopework\`.\`type_work\` tw ON tw.id = sw.typeWorkId
          INNER JOIN
      \`scopework\`.objects so ON so.id = sw.objectId
  WHERE
      objectId = :objectId AND swu.userId = :userId;
      `;

            const replacements = {
                userId: dto.userId,
                objectId: dto.objectId,
            };

            const data: IResScopeWorkByUserAndObject[] =
                await this.databaseService.executeQuery(query, replacements);

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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async getOneScopeWork(id: string, organizationId: number) {
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
            // const findTypeWork = await this.typeWorkRepository.findByPk(
            //     typeWorkId,
            // );
            const findTypeWork = await this.typeWorkService.getOneBy(
                {
                    criteria: { id: typeWorkId },
                    relations: [],
                },
                organizationId,
            );
            // const findObject = await this.objectsRepository.findByPk(objectId);
            const findObject = await this.objectService.getOneBy(
                { criteria: { id: objectId }, relations: [] },
                organizationId,
            );
            let findList = [];
            for (const item of listNameWork) {
                const { id } = item;
                // const findedList = await this.listNameWorkRepository.findByPk(
                //     id,
                //     {
                //         include: { all: true },
                //     },
                // );
                const findedList = await this.listNameWorkService.getOneBy(
                    {
                        criteria: { id },
                        relations: ['nameWorks'],
                    },
                    organizationId,
                );
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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
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
                    const item =
                        await this.nameListService.getDataProgressByList(
                            listNameWorkId,
                            idScopeWork,
                        );
                    const itemClone = [...item];
                    const quntityNumber = itemClone
                        .map((item) => item.quntity)
                        .reduce(
                            (currentItem, nextItem) => currentItem + nextItem,
                            0,
                        );
                    const quantityDifferenceNumber = itemClone
                        .map((item) => item.quantityDifference)
                        .reduce(
                            (currentItem, nextItem) => currentItem + nextItem,
                            0,
                        );
                    const addingCountNumber = itemClone
                        .map((item) => item.addingCount)
                        .reduce(
                            (currentItem, nextItem) => currentItem + nextItem,
                            0,
                        );
                    const dataCount = {
                        listNameWorkId,
                        idScopeWork,
                        quntity: quntityNumber,
                        isDifference: itemClone.find(
                            (item) => item.isDifference === true,
                        )
                            ? true
                            : false,
                        quantityDifference: quantityDifferenceNumber,
                        addingCount: addingCountNumber,
                        percent: (
                            (addingCountNumber / quntityNumber) *
                            100
                        ).toFixed(1),
                    };
                    arr.push(dataCount);
                }
                const quntityMain = arr
                    .map((item) => item.quntity)
                    .reduce(
                        (currentItem, nextItem) => currentItem + nextItem,
                        0,
                    );
                const addingCountMain = arr
                    .map((item) => item.addingCount)
                    .reduce(
                        (currentItem, nextItem) => currentItem + nextItem,
                        0,
                    );
                const mainCountData = {
                    listNameWorkId: arr.map((item) => item.listNameWorkId),
                    idScopeWork: arr.map((item) => item.idScopeWork),
                    quntity: quntityMain,
                    isDifference: arr.find((item) => item.isDifference === true)
                        ? true
                        : false,
                    quantityDifference: arr
                        .map((item) => item.quantityDifference)
                        .reduce(
                            (currentItem, nextItem) => currentItem + nextItem,
                            0,
                        ),
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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async getAllScopeWorkByUserId(id: string, organizationId: number) {
        try {
            if (id === '1') {
                const getAllScopeWork =
                    await this.userScopeWorkRepository.findAll({
                        attributes: [
                            [
                                sequelize.fn(
                                    'DISTINCT',
                                    sequelize.col('scopeWorkId'),
                                ),
                                'scopeWorkId',
                            ],
                        ],
                    });

                const listScopeWork = [];
                for (const { scopeWorkId } of getAllScopeWork) {
                    const findedScopeWork = await this.getOneScopeWork(
                        scopeWorkId.toString(),
                        organizationId,
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
                    organizationId,
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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    // Получение статистики
    async getAllListWorkForEditByScopeWorkId(
        id: string,
        organizationId: number,
    ) {
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
                // const oneList = await this.listNameWorkRepository.findByPk(
                //     idListNameWork,
                //     {
                //         include: { all: true },
                //     },
                // );
                const oneList = await this.listNameWorkService.getOneBy(
                    {
                        criteria: { id: idListNameWork },
                        relations: ['nameWorks'],
                    },
                    organizationId,
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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    // Редактировать объём
    async editScopeWork(dto: EditScopeWorkDto) {
        try {
            const { listNameWork, objectId, typeWorkId, users, scopeWorkId } =
                dto;
            const scopeWork = await this.scopeWorkRepository.findByPk(
                scopeWorkId,
            );

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

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async getAllScopeWorkSqlShort(id: string, organizationId: number) {
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
      sw.percent,
      sw.organizationId
  FROM
      scopework.\`user-scope-work\` usw
          INNER JOIN
      (SELECT 
              sw.id,
              sw.deletedAt,
              sw.organizationId,
              tw.name AS nameTypework,
              obj.name AS nameObject,
              SUM(sumSw.t1Quntity) AS sum,
              SUM(sumSw.t2Quntity) AS sumCurrent,
              ROUND(sumSw.t2Quntity / sumSw.t1Quntity * 100, 1) AS percent
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
      userId = :userId AND organizationId = :organizationId;
      `;
        const replacements = {
            userId: id,
            organizationId: organizationId,
        };

        const data: IScopeworkShort[] =
            await this.scopeWorkRepository.sequelize.query(query2, {
                type: QueryTypes.SELECT,
                replacements,
            });

        return data;
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async getHistoryTimeline(dto: HistoryTimelineDto) {
        try {
            // const query = `
            // SELECT *
            // FROM scopework.\`table-adding-data\` tad
            // WHERE tad.scopeWorkId = :idScopeWork AND tad.createdAt BETWEEN :dateFrom AND :dateTo AND tad.deletedAt IS NULL
            // ORDER BY tad.createdAt ASC;
            // `;
            const query2 = `
      SELECT 
	tad.scopeWorkId as scopeWorkId,
  tad.createdAt as createdAt,
    tad.nameListId as nameListId,
    CONCAT(ud.lastname, ' ' ,ud.firstname) as userName,
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
        GROUP BY tad.scopeWorkId, tad.nameListId, tad.createdAt,ud.lastname, ud.firstname, sw.name, nw.name, nw.unitName
ORDER BY nameWork ASC;
      `;

            const replacements = {
                idScopeWork: dto.idScopeWork,
                dateFrom: dto.dateFrom,
                dateTo: dto.dateTo,
            };

            // const data: ResHistoryTimeline[] =
            //   await this.scopeWorkRepository.sequelize.query(query2, {
            //     type: QueryTypes.SELECT,
            //     replacements,
            //   });

            const data: ResHistoryTimeline[] =
                await this.databaseService.executeQuery(query2, replacements);

            //const data = await this.scopeWorkRepository.findAll();

            return data;
        } catch (e) {
            console.log(e);
            if (e instanceof HttpException) {
                console.log(e);
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
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
                    'Дата добавления',
                    'Тип работ',
                    'Пользователь',
                    'Наименование',
                    'Количество',
                    'Ед.',
                ]);
                data.forEach((item) => {
                    worksheet.addRow([
                        item.scopeWorkId,
                        item.createdAt,
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
            console.log(e);
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    // Без повторяющихся наименований(без группировки)
    async quickOneScopeWorkById(id: string) {
        try {
            const query = `
      SELECT 
    nl.id AS id,
    nl.nameWorkId AS nameWorkId,
    nw.name AS name,
    u.name AS unitName,
    ROUND(SUM(nl.quntity), 2) AS quntityMain,
    ROUND(SUM(tadQ.quntitySum), 2) AS quntityCompleted,
    ROUND(SUM(nl.quntity) - SUM(tadQ.quntitySum),
            2) AS remainderQuntity,
    ROUND(tadQ.quntitySum / nl.quntity * 100, 1) AS percent,
    nl.listNameWorkId AS listNameWorkId
FROM
    scopework.\`name-list\` nl
        INNER JOIN
    scopework.\`name_work\` nw ON nw.id = nl.nameWorkId
        LEFT JOIN
    (SELECT 
        tad.nameListId AS nameListId,
            ROUND(SUM(quntity), 2) AS quntitySum
    FROM
        scopework.\`table-adding-data\` tad
    WHERE
        tad.deletedAt IS NULL
            AND quntity IS NOT NULL
    GROUP BY tad.nameListId) tadQ ON tadQ.nameListId = nl.id
        INNER JOIN
    scopework.unit u ON nw.unitId = u.id
WHERE
    nl.listNameWorkId IN (SELECT 
            id
        FROM
            scopework.\`list_name_work\`
        WHERE
            scopeWorkId = :id)
        AND nl.deletedAt IS NULL
GROUP BY nl.id, nl.nameWorkId, nw.name, u.id, u.name, nl.quntity, tadQ.quntitySum, nl.quntity
ORDER BY nw.name ASC;
      `;
            const replacements = {
                id: id,
            };

            const data: IResQuickOneScopeWorkById[] =
                await this.databaseService.executeQuery(query, replacements);

            return data;
        } catch (e) {
            if (e instanceof HttpException) {
                console.log(e);
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
