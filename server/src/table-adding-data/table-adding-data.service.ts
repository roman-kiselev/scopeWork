import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, QueryTypes } from 'sequelize';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameWork } from 'src/name-work/name-work.model';
import { NameList } from 'src/name_list/name-list.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { Unit } from 'src/unit/unit.model';
import { UserDescription } from 'src/user-description/user-description.model';
import { User } from 'src/user/user.model';
import { DelTableAddingData } from './del-table-adding-data.model';
import { CreateDelTableDto } from './dto/create-deltable.dto';
import { CreateTableAddingDatumDto } from './dto/create-table-adding-datum.dto';
import { UpdateTableAddingDatumDto } from './dto/update-table-adding-datum.dto';
import { IDataGetHistoryForNameWorkId } from './interfaces/IDataGetHistoryForNameWorkId';
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
    @InjectModel(DelTableAddingData)
    private delTableAddingDataRepository: typeof DelTableAddingData,
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

  async getHistoryForNameWorkId(params: IGetHistory) {
    try {
      const query = `
      SELECT 
      \`table-adding-data\`.id,
      \`user-description\`.firstname AS \`firstname\`,
      \`user-description\`.lastname AS \`lastname\`,
      \`table-adding-data\`.quntity,
      \`table-adding-data\`.createdAt,
      \`table-adding-data\`.deletedAt,
      \`del_table_adding_data\`.id AS \`delCandidate\`
  FROM
      scopework.\`table-adding-data\`
          INNER JOIN
      \`user-description\` ON \`user-description\`.userId = scopework.\`table-adding-data\`.userId
          LEFT JOIN
      \`del_table_adding_data\` ON \`del_table_adding_data\`.tableAddingDataId = scopework.\`table-adding-data\`.id
          AND \`del_table_adding_data\`.deletedAt IS NULL
  WHERE
              nameWorkId = :nameWorkId AND nameListId = :nameListId
              ORDER BY createdAt ASC;
      `;
      const replacements = {
        nameListId: params.nameListId,
        nameWorkId: params.nameWorkId,
        scopeWorkId: params.scopeWorkId,
      };

      const data: IDataGetHistoryForNameWorkId[] =
        await this.tableAddingDataRepository.sequelize.query(query, {
          type: QueryTypes.SELECT,
          replacements,
        });

      return data;
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

  async remove(id: number) {
    try {
      const querySelect = `
      SELECT 
          *
      FROM
          scopework.\`table-adding-data\`
      WHERE
          id = :id;`;

      const queryUpdateRemove = `
      UPDATE scopework.\`table-adding-data\` 
      SET 
          deletedAt = CURRENT_TIMESTAMP
      WHERE
          id = :id;
      
      `;

      const replacements = {
        id,
      };
      const dataSelect: TableAddingData[] =
        await this.tableAddingDataRepository.sequelize.query(querySelect, {
          type: QueryTypes.SELECT,
          replacements,
        });
      const data = await this.tableAddingDataRepository.sequelize.query(
        queryUpdateRemove,
        {
          type: QueryTypes.UPDATE,
          replacements,
        },
      );

      if (data) {
        return dataSelect;
      }
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async recovery(id: number) {
    try {
      const querySelect = `
      SELECT 
          *
      FROM
          scopework.\`table-adding-data\`
      WHERE
          id = :id;`;

      const queryUpdateRemove = `
      UPDATE scopework.\`table-adding-data\` 
      SET 
          deletedAt = null
      WHERE
          id = :id;
      
      `;

      const replacements = {
        id,
      };
      const dataSelect: TableAddingData[] =
        await this.tableAddingDataRepository.sequelize.query(querySelect, {
          type: QueryTypes.SELECT,
          replacements,
        });
      const data = await this.tableAddingDataRepository.sequelize.query(
        queryUpdateRemove,
        {
          type: QueryTypes.UPDATE,
          replacements,
        },
      );

      if (data) {
        return dataSelect;
      }
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createCandidateDel(dto: CreateDelTableDto) {
    try {
      const data = await this.delTableAddingDataRepository.create({
        tableAddingDataId: dto.tableAddingDataId,
        userId: dto.userId,
      });

      return data;
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async confirmDelCandidate(tableAddingDataId: number, idDelCandidate: number) {
    try {
      const removeData = await this.remove(tableAddingDataId);
      const queryConfirmDel = `
      UPDATE scopework.\`del_table_adding_data\` 
      SET 
          deletedAt = CURRENT_TIMESTAMP
      WHERE
          id = :idDelCandidate;
      
      `;
      const replacements = {
        idDelCandidate,
      };
      const data = await this.delTableAddingDataRepository.sequelize.query(
        queryConfirmDel,
        {
          type: QueryTypes.UPDATE,
          replacements,
        },
      );

      return removeData;
    } catch (e) {
      if (e instanceof HttpException) {
        return e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
