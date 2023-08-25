import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TypeWork } from 'src/type-work/type-work.model';
import { CreateUniteDto } from 'src/unit/dto/unit.dto';
import { UnitService } from 'src/unit/unit.service';
import { CreateNameWorkDto } from './dto/create-name-work.dto';
import { NameWork } from './name-work.model';

@Injectable()
export class NameWorkService {
  constructor(
    @InjectModel(NameWork) private nameWorkRepository: typeof NameWork,
    @InjectModel(TypeWork) private typeWorkRepository: typeof TypeWork,
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

  async checkNameWithDto(dto: CreateNameWorkDto) {
    try {
      const { name, typeWorkId, unitId } = dto;
      const isName = await this.nameWorkRepository.findOne({
        where: {
          name,
        },
      });
      const isTypeWork = await this.typeWorkRepository.findByPk(typeWorkId);
      const isUnit = await this.unitService.getOneUnitById(unitId);
      if (!isName || !isTypeWork || !isUnit) {
        return false;
      }
      return true;
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

  async create(dto: CreateNameWorkDto) {
    try {
      const { name, typeWorkId, unitId } = dto;
      // Проверим существование товара
      if (!this.checkNameWithDto(dto)) {
        throw new HttpException(
          'Не удалось создать наименование',
          HttpStatus.BAD_REQUEST,
        );
      }
      // Создаём наименование и связь
      const newNameWork = await this.nameWorkRepository.create({
        name: name,
        unitId: unitId,
      });
      await newNameWork.$set('typeWorks', typeWorkId);

      const nameWork = await this.nameWorkRepository.findOne({
        where: { id: newNameWork.id },
        include: [
          {
            model: TypeWork,
            attributes: {
              exclude: ['NameWorkTypeWork'],
            },
            through: { attributes: [] },
          },
        ],
      });
      if (!nameWork) {
        throw new HttpException(
          'Наименование не найдено',
          HttpStatus.NOT_FOUND,
        );
      }
      const unit = await this.unitService.getOneUnitById(nameWork.unitId);

      const finishNameWork = {
        id: nameWork.id,
        name: nameWork.name,
        deletedAt: nameWork.deletedAt,
        createdAt: nameWork.createdAt,
        updatedAt: nameWork.updatedAt,
        unit: unit,
        typeWorks: nameWork.typeWorks,
      };

      return finishNameWork;
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
        where: {
          deletedAt: null,
        },
        include: [
          {
            model: TypeWork,
            attributes: {
              exclude: ['NameWorkTypeWork'],
            },
            through: { attributes: [] },
          },
        ],
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
            typeWorks: name.typeWorks,
            unit: unit,
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

  async getOneById(id: number) {
    try {
      const nameWork = await this.nameWorkRepository.findOne({
        where: { id },
        include: [
          {
            model: TypeWork,
            attributes: {
              exclude: ['NameWorkTypeWork'],
            },
            through: { attributes: [] },
          },
        ],
      });
      if (!nameWork) {
        throw new HttpException(
          'Наименование не найдено',
          HttpStatus.NOT_FOUND,
        );
      }
      const unit = await this.unitService.getOneUnitById(nameWork.unitId);

      const finishNameWork = {
        id: nameWork.id,
        name: nameWork.name,
        deletedAt: nameWork.deletedAt,
        createdAt: nameWork.createdAt,
        updatedAt: nameWork.updatedAt,
        unit: unit,
        typeWorks: nameWork.typeWorks,
      };
      return finishNameWork;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
