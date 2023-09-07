import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateListDto } from './dto/create-list.dto';
import { ListNameWork } from './list-name-work.model';

@Injectable()
export class ListNameWorkService {
  constructor(
    @InjectModel(ListNameWork)
    private listNameWorkRepository: typeof ListNameWork,
  ) {}

  async createList(dto: CreateListDto) {
    try {
      const { name = '', description = '', typeWorkId = 5 } = dto;

      const nameList = await this.listNameWorkRepository.create({
        description,
        name,
        typeWorkId,
      });
      return nameList;
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
      const allList = await this.listNameWorkRepository.findAll();
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
}
