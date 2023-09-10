import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameWork } from 'src/name-work/name-work.model';
import { CreateNameListDto } from './dto/create-name-list.dto';
import { NameList } from './name-list.model';

@Injectable()
export class NameListService {
  constructor(
    @InjectModel(NameWork) private nameWorkRepository: typeof NameWork,
    @InjectModel(NameList) private nameListRepository: typeof NameList,
    @InjectModel(ListNameWork)
    private listNameWorkRepository: typeof ListNameWork,
  ) {}

  // Сооздание
  async create(dto: CreateNameListDto) {
    try {
      const { listNameWorkId, nameWorkId, quantity } = dto;

      const newName = await this.nameListRepository.create(dto);
      return newName;
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
}
