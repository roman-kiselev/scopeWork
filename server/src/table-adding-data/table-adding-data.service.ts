import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTableAddingDatumDto } from './dto/create-table-adding-datum.dto';
import { UpdateTableAddingDatumDto } from './dto/update-table-adding-datum.dto';
import { TableAddingData } from './table-adding-data.model';

@Injectable()
export class TableAddingDataService {
  constructor(
    @InjectModel(TableAddingData)
    private tableAddingDataRepository: typeof TableAddingData,
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
