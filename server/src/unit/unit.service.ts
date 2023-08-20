import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUniteDto } from './dto/unit.dto';
import { Unit } from './unit.model';

@Injectable()
export class UnitService {
  constructor(@InjectModel(Unit) private unitRepository: typeof Unit) {}

  async checkByName(name: string) {
    try {
      const unit = await this.unitRepository.findOne({
        where: {
          name,
          deletedAt: null,
        },
      });
      if (unit) {
        return true;
      }
      return false;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByName(name: string) {
    try {
      const unit = await this.unitRepository.findOne({
        rejectOnEmpty: undefined,
        where: {
          name,
        },
      });
      if (!unit) {
        throw new HttpException('Не существует', HttpStatus.NOT_FOUND);
      }
      return unit;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUnit(dto: CreateUniteDto) {
    try {
      const unit = await this.checkByName(dto.name);

      if (unit) {
        throw new HttpException('Уже существует', HttpStatus.BAD_REQUEST);
      }
      const newUnit = await this.unitRepository.create(dto);
      if (!newUnit) {
        throw new HttpException('Не удалось создать', HttpStatus.BAD_REQUEST);
      }
      return newUnit;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUnit() {
    try {
      const units = await this.unitRepository.findAll();
      if (!units) {
        throw new HttpException('Произошла ошибка', HttpStatus.BAD_REQUEST);
      }
      return units;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOneUnitById(id: number) {
    try {
      const unit = this.unitRepository.findByPk(id);
      if (!unit) {
        throw new HttpException('Не найдено', HttpStatus.NOT_FOUND);
      }
      return unit;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUniteOrPieces(id?: number) {
    try {
      const dtoUnit: CreateUniteDto = {
        name: 'шт',
        description: 'Штуки',
      };
      // Если нет id
      if (!id) {
        const checkUnit = this.checkByName(dtoUnit.name);
        if (!checkUnit) {
          const unit = await this.createUnit(dtoUnit);
          return unit;
        }
      }
      // Если есть id
      const foundUnit = this.getOneUnitById(id);
      return foundUnit;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Создать ед.измерения с
}
