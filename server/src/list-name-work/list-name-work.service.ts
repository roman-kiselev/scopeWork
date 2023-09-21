import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NameListService } from 'src/name_list/name_list.service';
import { CreateListDto } from './dto/create-list.dto';
import { ListNameWork } from './list-name-work.model';

@Injectable()
export class ListNameWorkService {
  constructor(
    @InjectModel(ListNameWork)
    private listNameWorkRepository: typeof ListNameWork,
    private nameListService: NameListService,
  ) {}

  async createList(dto: CreateListDto) {
    try {
      const { name = '', description = '', typeWorkId = 5, listNames } = dto;
      // const nameList = await this.listNameWorkRepository.create({
      //   description,
      //   name,
      //   typeWorkId,
      // });

      // const newNameList = await this.listNameWorkRepository.findByPk(
      //   nameList.id,
      //   { include: { all: true } },
      // );

      // return newNameList;
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
}
