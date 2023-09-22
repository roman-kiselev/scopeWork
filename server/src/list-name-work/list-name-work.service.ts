import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NameListService } from 'src/name_list/name_list.service';

import { Item } from 'src/name_list/dto/create-name-list-by-name.dto';
import { CreateNameListDto } from 'src/name_list/dto/create-name-list.dto';
import { CreateListDto } from './dto/create-list.dto';
import { ListNameWorkEditDto } from './dto/list-name-work-edit.dto';
import { ListNameWork } from './list-name-work.model';

@Injectable()
export class ListNameWorkService {
  constructor(
    @InjectModel(ListNameWork)
    private listNameWorkRepository: typeof ListNameWork,
    private nameListService: NameListService,
  ) {}

  private async formNameAsItem(nameListId: number) {
    try {
      const nameList = await this.listNameWorkRepository.findByPk(nameListId, {
        include: { all: true },
      });
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

      const newNameList = await this.listNameWorkRepository.findByPk(
        nameList.id,
        { include: { all: true } },
      );

      return newNameList;
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

  async getOneById(id: number) {
    try {
      if (id === 0) {
        return {};
      }
      const list = await this.listNameWorkRepository.findByPk(id, {
        include: { all: true },
      });
      if (!list) {
        throw new HttpException('Список не найден', HttpStatus.BAD_REQUEST);
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

  async editList(dto: ListNameWorkEditDto) {
    try {
      const { description, name, list, idNumber } = dto;
      // Редактируем
      const editFields = await this.listNameWorkRepository.findByPk(idNumber, {
        include: { all: true },
      });

      // Обновляем наименование и описание
      if (editFields) {
        editFields.description = description;
        editFields.name = name;
        await editFields.save();
      } else {
        throw new HttpException('Запись не найдена', HttpStatus.NOT_FOUND);
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

      const newNameList = await this.listNameWorkRepository.findByPk(idNumber, {
        include: { all: true },
      });
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
}
