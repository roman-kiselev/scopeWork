import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUniteDto } from 'src/unit/dto/unit.dto';
import { UnitService } from 'src/unit/unit.service';
import { CreateNameWorkDto } from './dto/create-name-work.dto';
import { NameWork } from './name-work.model';

@Injectable()
export class NameWorkService {
  constructor(
    @InjectModel(NameWork) private nameWorkRepository: typeof NameWork,
    private unitService: UnitService,
  ) {}

  async checkOneByName(name: string) {
    try {
      const nameWork = await this.nameWorkRepository.findOne({
        where: {
          name,
        },
      });

      if (!nameWork) {
        return false;
      }

      return nameWork;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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
      // Проверяем существование штук
      const nameUnite = 'шт';
      const unit = await this.unitService.checkByName(nameUnite);
      // Проверяем существование товара
      const nameWork = await this.checkOneByName(dto.name);
      // Если нет товара и есть единица
      if (unit && !nameWork) {
        const foundUnit = await this.unitService.findByName(nameUnite);
        if (dto.unitId) {
          const newNameWork = await this.nameWorkRepository.create(dto);
          return newNameWork;
        }
        const newNameWork = await this.nameWorkRepository.create({
          ...dto,
          unitId: foundUnit.id,
        });
        return newNameWork;
      }
      if (!unit && !nameWork) {
        const dtoUnit: CreateUniteDto = {
          name: 'шт',
          description: 'Штуки',
        };
        const newUnit = await this.unitService.createUnit(dtoUnit);
        if (dto.unitId) {
          const newNameWork = await this.nameWorkRepository.create(dto);
          return newNameWork;
        }
        const newNameWork = await this.nameWorkRepository.create({
          ...dto,
          unitId: newUnit.id,
        });
        return newNameWork;
      }
      if (!unit && nameWork) {
        const dtoUnit: CreateUniteDto = {
          name: 'шт',
          description: 'Штуки',
        };
        await this.unitService.createUnit(dtoUnit);
        throw new HttpException(
          'Наименование уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException('Не удалось создать', HttpStatus.BAD_REQUEST);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllNames() {
    try {
      const names = await this.nameWorkRepository.findAll({
        include: { all: true },
        where: {
          deletedAt: null,
        },
      });

      const newNames = Promise.all(
        names.map(async (name) => {
          // Получим по id единицу измерения
          const unit = await this.unitService.getOneUnitById(name.unitId);
          return {
            id: name.id,
            name: name.name,
            deletedAt: name.deletedAt,
            createdAt: name.createdAt,
            updatedAt: name.updatedAt,
            unit: unit.name,
          };
        }),
      );

      return newNames;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
