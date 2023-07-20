import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UnitService } from 'src/unit/unit.service';
import { CreateNameWorkDto } from './dto/create-name-work.dto';
import { NameWork } from './name-work.model';

@Injectable()
export class NameWorkService {
  constructor(
    @InjectModel(NameWork) private nameWorkRepository: typeof NameWork,
    private unitService: UnitService,
  ) {}

  async findOneByName(name: string) {
    try {
      const nameWork = await this.nameWorkRepository.findOne({
        where: {
          name,
          deletedAt: null,
        },
      });
      if (!nameWork) {
        throw new HttpException(
          'Наименование не найдено',
          HttpStatus.NOT_FOUND,
        );
      }
      return nameWork;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createNameWorkDefault(dto: CreateNameWorkDto) {
    try {
      const findName = this.findOneByName(dto.name);
      if (findName) {
        throw new HttpException(
          'Наименование существует',
          HttpStatus.NOT_FOUND,
        );
      }
      // Нужно добавить штуки по умолчанию
      const nameUnite = 'шт';
      const findUnit = await this.unitService.checkByName(nameUnite);
      if (findUnit instanceof HttpException) {
        const name = await this.unitService.findByName(nameUnite);
        const newNameUnite = await this.nameWorkRepository.create({
          ...dto,
          unitId: name.id,
        });
        if (!newNameUnite) {
          throw new HttpException('Не удалось создать', HttpStatus.BAD_REQUEST);
        }
      }
      const name = await this.unitService.createUnit({
        name: 'шт',
        description: 'Штуки',
      });
      const newNameUnite = await this.nameWorkRepository.create({
        ...dto,
        unitId: name.id,
      });
      if (!newNameUnite) {
        throw new HttpException('Не удалось создать', HttpStatus.BAD_REQUEST);
      }

      return newNameUnite;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
