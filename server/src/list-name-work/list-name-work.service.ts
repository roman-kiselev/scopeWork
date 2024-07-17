import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NameListService } from 'src/name_list/name_list.service';

import { Item } from 'src/name_list/dto/create-name-list-by-name.dto';
import { CreateNameListDto } from 'src/name_list/dto/create-name-list.dto';
import { NameList } from 'src/name_list/entities/name-list.model';
import { CreateListDto } from './dto/create-list.dto';
import { ListNameWorkEditDto } from './dto/list-name-work-edit.dto';
import { ListNameWork } from './entities/list-name-work.model';

@Injectable()
export class ListNameWorkService {
    constructor(
        @InjectModel(ListNameWork)
        private listNameWorkRepository: typeof ListNameWork,
        @InjectModel(NameList) private nameListRepository: typeof NameList,
        private nameListService: NameListService,
    ) {}

    // TODO изменить include и изменить наименование
    /**
     * Метод возвращает все списки по массиву scopeworkID.
     * @returns Возвращает list
     */
    async getListTest(arr: number[]) {
        const listNameWorkArr = await this.listNameWorkRepository.findAll({
            where: { id: arr },
            include: { all: true },
        });

        return listNameWorkArr;
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    private async formNameAsItem(nameListId: number) {
        try {
            const nameList = await this.listNameWorkRepository.findByPk(
                nameListId,
                {
                    include: { all: true },
                },
            );
            const x = JSON.stringify(nameList.nameWorks);
            const cleanObj = JSON.parse(x);
            //console.log(cleanObj);
            const arrItem: Item[] = cleanObj.map((item) => {
                //console.log(item);
                return {
                    id: item.id,
                    index: item.id,
                    key: item.id,
                    name: item.name,
                    quntity: item.NameList.quntity,
                } as Item;
            });

            return arrItem;
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
    async createList(dto: CreateListDto) {
        try {
            const { name = '', description = '', typeWorkId = 5, list } = dto;
            // После получения данных создаём список
            const nameList = await this.listNameWorkRepository.create({
                description,
                name,
                typeWorkId,
            });
            // Далее создаём наименования и количество
            const finishedList = await this.nameListService.createByName({
                list,
                listNameWorkId: nameList.id,
                typeWorkId: typeWorkId,
            });
            if (finishedList) {
                const newNameList = await this.listNameWorkRepository.findByPk(
                    nameList.id,
                    { include: { all: true } },
                );

                return newNameList;
            }
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
    async getAllList() {
        try {
            const allList = await this.listNameWorkRepository.findAll({
                include: { all: true },
            });
            return allList;
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
    async getOneById(id: string) {
        try {
            // if (id === '0') {
            //   return {};
            // }
            const list = await this.listNameWorkRepository.findByPk(id, {
                include: { all: true },
            });

            // const list = await this.listNameWorkRepository.findByPk(id, {
            //   include: [
            //     {
            //       model: ScopeWork,
            //     },
            //     {
            //       model: NameWork,
            //       order: [[sequelize.literal('name'), 'ASC']],
            //     },
            //   ],
            // });

            if (!list) {
                throw new HttpException(
                    'Список не найден',
                    HttpStatus.BAD_REQUEST,
                );
            }

            return list;
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
    async editList(dto: ListNameWorkEditDto) {
        try {
            const { description, name, list, idNumber } = dto;
            // Редактируем
            const editFields = await this.listNameWorkRepository.findByPk(
                idNumber,
                {
                    include: { all: true },
                },
            );

            // Обновляем наименование и описание
            if (editFields) {
                editFields.description = description;
                editFields.name = name;
                await editFields.save();
            } else {
                throw new HttpException(
                    'Запись не найдена',
                    HttpStatus.NOT_FOUND,
                );
            }

            const dataForAdd = [];
            const dataForEdit = [];
            const cleanEditFields = await this.formNameAsItem(idNumber);

            for (let i = 0; i < list.length; i++) {
                const findItem = editFields.nameWorks.find(
                    (item) => item.id === list[i].id,
                );
                if (findItem) {
                    dataForEdit.push(list[i]);
                } else {
                    dataForAdd.push(list[i]);
                }
            }
            const dataForDel = [];
            // Берём значение из листа для редактирвоания
            // Если найдено в основном листе ничего не делаем
            // Если ненайдено добавляем в dataForDel

            for (let i = 0; i < cleanEditFields.length; i++) {
                const findForDel = list.find(
                    (item) => item.id === cleanEditFields[i].id,
                );

                if (!findForDel) {
                    dataForDel.push(cleanEditFields[i]);
                }
            }

            // console.log(dataForEdit);
            // console.log(dataForAdd);
            // console.log(dataForDel);

            const newEditArr = await this.nameListService.editArr(
                dataForEdit.map(
                    ({ id, quntity }: Item) =>
                        ({
                            listNameWorkId: idNumber,
                            nameWorkId: id,
                            quntity: quntity,
                        } as CreateNameListDto),
                ),
            );
            const newDelArr = await this.nameListService.delArr(
                dataForDel.map(
                    ({ id, quntity }: Item) =>
                        ({
                            listNameWorkId: idNumber,
                            nameWorkId: id,
                            quntity: quntity,
                        } as CreateNameListDto),
                ),
            );

            const newAddArr = await this.nameListService.createArr(
                dataForAdd.map(
                    ({ id, quntity }: Item) =>
                        ({
                            listNameWorkId: idNumber,
                            nameWorkId: id,
                            quntity,
                        } as CreateNameListDto),
                ),
            );

            //console.log(newEditArr, newDelArr, newAddArr);

            const newNameList = await this.listNameWorkRepository.findByPk(
                idNumber,
                {
                    include: { all: true },
                },
            );
            //throw new HttpException('Test err', HttpStatus.BAD_REQUEST);
            return newNameList;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера общая',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async getListNameWorksByTypeWorkId(id: string) {
        try {
            const listNameWorks = await this.listNameWorkRepository.findAll({
                where: { typeWorkId: id, scopeWorkId: null, deletedAt: null },
                include: { all: true },
            });
            const finishList = JSON.parse(JSON.stringify(listNameWorks));
            if (!listNameWorks || listNameWorks.length === 0) {
                return [];
            }

            return finishList;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера общая',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async delList(id: string) {
        try {
            const findedList = await this.listNameWorkRepository.findByPk(id, {
                include: {
                    all: true,
                },
            });
            if (!findedList) {
                throw new HttpException(
                    'Список не найден',
                    HttpStatus.NOT_FOUND,
                );
            }

            const delList = await this.listNameWorkRepository.destroy({
                where: {
                    id,
                },
            });
            if (!delList) {
                throw new HttpException(
                    'Не удалось удалить список',
                    HttpStatus.BAD_REQUEST,
                );
            }

            return findedList;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера общая',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async copyList(id: string) {
        try {
            const oneList = await this.getOneById(id);
            const { name, description, typeWorkId, nameWorks } = oneList;
            const copyName = `${name}(копия)`;
            const copyDescription = `${description}(копия)`;
            const nameWorkData = JSON.parse(JSON.stringify(nameWorks));

            //Подготовим лист
            const listItem = nameWorkData.map((item) => {
                const { id, name, NameList } = item;
                return {
                    id: id,
                    index: id,
                    key: id.toString(),
                    name,
                    quntity: NameList.quntity,
                } as Item;
            });

            const copyList = await this.createList({
                description: copyDescription,
                name: copyName,
                list: listItem,
                typeWorkId,
            });

            return copyList;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера общая',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async getProgressForOneList(id: number) {
        try {
            // const list = await this.nameListService.findAll({where: {
            // }}, {
            //   include: { all: true },
            // });
            // return list;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера общая',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // ------------------------------------------------//

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async getAllShort() {
        try {
            const list = await this.listNameWorkRepository.findAll();
            return list;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера общая',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async getAllListByScopeWorkId(id: number) {
        try {
            const list = await this.listNameWorkRepository.findAll({
                where: {
                    scopeWorkId: id,
                },
            });

            return list;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера общая',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Получим список наименований в одном списке по id списка
}
