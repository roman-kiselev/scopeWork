import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameWork } from 'src/name-work/name-work.model';
import { NameList } from 'src/name_list/name-list.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { Unit } from 'src/unit/unit.model';
import { UserDescription } from 'src/user-description/user-description.model';
import { User } from 'src/user/user.model';
import { CreateTableAddingDatumDto } from './dto/create-table-adding-datum.dto';
import { UpdateTableAddingDatumDto } from './dto/update-table-adding-datum.dto';
import { IGetHistory } from './interfaces/IGetHistory';
import { TableAddingData } from './table-adding-data.model';

@Injectable()
export class TableAddingDataService {
  constructor(
    @InjectModel(TableAddingData)
    private tableAddingDataRepository: typeof TableAddingData,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(NameList) private nameListRepository: typeof NameList,
    @InjectModel(NameWork) private nameWorkRepository: typeof NameWork,
    @InjectModel(ScopeWork) private scopeWorkRepository: typeof ScopeWork,
    @InjectModel(ListNameWork)
    private listNameWorkRepository: typeof ListNameWork,
    @InjectModel(UserDescription)
    private userDescriptionRepository: typeof UserDescription,
    @InjectModel(Unit) private unitRepository: typeof Unit,
  ) {}
  async create(createTableAddingDatumDto: CreateTableAddingDatumDto) {
    try {
      const newData = await this.tableAddingDataRepository.create(
        createTableAddingDatumDto,
      );

      return newData;
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const findedList = await this.tableAddingDataRepository.findAll({
        include: { all: true },
      });
      return findedList;
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllString(
    page: string,
    limit: string,
    dateFrom?: string,
    dateTo?: string,
  ) {
    try {
      const currentDate = new Date();
      const day =
        currentDate.getDate() < 10
          ? `0${currentDate.getDate()}`
          : `${currentDate.getDate()}`;
      const monthFrom =
        currentDate.getMonth() + 1 < 10
          ? `0${currentDate.getMonth() + 1}`
          : `${currentDate.getMonth() + 1}`;
      const monthTo =
        currentDate.getMonth() < 10
          ? `0${currentDate.getMonth()}`
          : `${currentDate.getMonth()}`;
      const year = currentDate.getFullYear();
      const dayPlusOne = Number(dateFrom.split('-')[2]) + 1;

      const finishDateFrom = dateFrom
        ? `${dateFrom.split('-')[0]}-${dateFrom.split('-')[1]}-${dayPlusOne}`
        : `${year}-${monthFrom}-${Number(dayPlusOne)}`;
      const finishDateFromPlusOne = dateFrom
        ? dateFrom
        : `${year}-${monthFrom}-${Number(day)}`;
      const finishDateTo = dateTo ? dateTo : `${year}-${monthTo}-${day}`;
      const finishDateTest = dateFrom
        ? dateFrom
        : `${year}-${monthFrom}-${Number(day) - 1}`;
      console.log(dateFrom, dateTo);
      console.log(finishDateFrom, finishDateTo);

      const { count, rows } =
        await this.tableAddingDataRepository.findAndCountAll({
          where: {
            createdAt: {
              [Op.between]: [finishDateTo, finishDateFrom],
            },
          },
          order: [['id', 'DESC']],
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
        });
      const pagination = {
        count,
        page,
        limit,
      };

      const arr = [];
      for (const item of rows) {
        const {
          id,
          quntity,
          createdAt,
          userId,
          nameListId,
          nameWorkId,
          scopeWorkId,
        } = item;
        // Получим пользователя
        const user = await this.userDescriptionRepository.findOne({
          where: { userId },
        });
        const userName = `${user.lastname} ${user.firstname}`;

        // Получим наименование работ
        const oneNameWork = await this.nameWorkRepository.findByPk(nameWorkId);
        const nameWork = oneNameWork.name;
        const finishDate = createdAt.toString().split('T')[0];
        const unitName = (
          await this.unitRepository.findByPk(oneNameWork.unitId)
        ).name;
        const log = {
          id,
          userId,
          scopeWorkId,
          nameWorkId,
          nameListId,
          createdAt,
          text: `Пользователь ${userName} добавил в Объём №${scopeWorkId}: "${nameWork}" - ${quntity} ${unitName}.`,
        };
        arr.push(log);
      }

      return { pagination: pagination, rows: arr };
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getHistory(nameListId: number) {
    try {
      const findedList = await this.tableAddingDataRepository.findAll({
        where: { nameListId },
      });
      let count = 0;
      const arr = [];
      findedList.forEach((item) => {
        if (count < 90) {
          count += item.quntity;
        }
        arr.push(count);
      });

      return findedList;
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getHistoryByNameWorkId(params: IGetHistory) {
    try {
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tableAddingDatum`;
  }

  update(id: number, updateTableAddingDatumDto: UpdateTableAddingDatumDto) {
    return `This action updates a #${id} tableAddingDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} tableAddingDatum`;
  }
}
