import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DatabaseService } from 'src/database/database.service';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { CreateUniteDto } from 'src/unit/dto/unit.dto';
import { Unit } from 'src/unit/unit.model';
import { UnitService } from 'src/unit/unit.service';
import { CreateNameWorkArrDto } from './dto/create-name-work-arr.dto';
import { CreateNameWorkRowDto } from './dto/create-name-work-row.dto';
import { CreateNameWorkDto } from './dto/create-name-work.dto';
import { NameWorkTypeWork } from './name-work-typework';
import { NameWork } from './name-work.model';

@Injectable()
export class NameWorkService {
  constructor(
    @InjectModel(NameWork) private nameWorkRepository: typeof NameWork,
    @InjectModel(TypeWork) private typeWorkRepository: typeof TypeWork,
    @InjectModel(NameWorkTypeWork)
    private nameWorkTypeWorkRepository: typeof NameWorkTypeWork,
    @InjectModel(Unit) private unitRepository: typeof Unit,
    private unitService: UnitService,
    private databaseService: DatabaseService,
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
          name: name.trim(),
        },
      });

      const isTypeWorkArr = [];
      for (const item of typeWorkId) {
        const isTypeWork = await this.typeWorkRepository.findByPk(item);
        if (!isTypeWork) {
          isTypeWorkArr.push(false);
        }
      }

      const isUnit = await this.unitService.getOneUnitById(unitId);
      if (!isName || isTypeWorkArr.length > 0 || !isUnit) {
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

  private async addTypeWork(id: number, arr: number[]): Promise<void> {
    try {
      console.log(id);
      console.log(arr);
      // Проверяем существование типа и привязываем
      const nameWork = await this.nameWorkRepository.findByPk(id);
      if (nameWork) {
        for (const item of arr) {
          const typeWork = await this.typeWorkRepository.findByPk(item);
          if (typeWork) {
            await nameWork.$set('typeWorks', typeWork.id);
          }
        }
      }
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
        await newNameWork.$set('typeWorks', [dto.typeWorkId[0]]);

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
        await newNameWork.$set('typeWorks', [dto.typeWorkId[0]]);

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
      console.log(dto);
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
        name: name.trim(),
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
          {
            model: TableAddingData,
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

  async updateNameWork(dto: CreateNameWorkDto) {
    try {
      const { name, unitId, typeWorkId } = dto;

      // const findedName = await this.
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createNoChecks(dto: CreateNameWorkDto) {
    try {
      console.log(dto);
      const { name, typeWorkId, unitId } = dto;

      // Создаём наименование и связь
      // Ищем наименование
      const findedNameWork = await this.nameWorkRepository.findOne({
        where: { name: name.trim() },
      });
      // Если есть
      if (findedNameWork) {
        // Проверяем связь с типом
        const findNameAndType = await this.nameWorkTypeWorkRepository.findOne({
          where: {
            nameWorkId: findedNameWork.id,
            typeWorkId: typeWorkId,
          },
        });
        // Если связи нет , но при этом наименование есть
        if (!findNameAndType) {
          // Добавляем тип
          await findedNameWork.$add('typeWorks', typeWorkId);
          const unit = await this.unitService.getOneUnitById(
            findedNameWork.unitId,
          );

          const finishNameWork = {
            id: findedNameWork.id,
            name: findedNameWork.name,
            deletedAt: findedNameWork.deletedAt,
            createdAt: findedNameWork.createdAt,
            updatedAt: findedNameWork.updatedAt,
            unit: unit,
            typeWorks: findedNameWork.typeWorks,
          };

          return finishNameWork;
        }
      }

      const newNameWork = await this.nameWorkRepository.create({
        name: name.trim(),
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
          {
            model: TableAddingData,
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

  async getAllData() {
    try {
      const data = await this.nameWorkRepository.findAll({
        include: { all: true },
      });

      return data;
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

  async getOneByIdShort(id: number) {
    try {
      const nameWork = await this.nameWorkRepository.findByPk(id);
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

  // Получить наименования по типу
  async getAllByTypeWorkId(typeWorkId: string) {
    try {
      if (typeWorkId === '0') {
        // const names = await this.nameWorkRepository.findAll({
        //   where: {
        //     deletedAt: null,
        //   },
        // });
        return [];
      }
      const names = await this.typeWorkRepository.findByPk(typeWorkId, {
        include: [
          {
            model: NameWork,
            attributes: {
              exclude: ['NameWorkTypeWork'],
            },
            through: { attributes: [] },
          },
        ],
      });
      const newNames = Promise.all(
        names.nameWorks.map(async (name) => {
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

  // Создать из excel файла - получаем массив
  async createArrNameWork(dto: CreateNameWorkArrDto[]) {
    try {
      const arr = [];

      for (const { name, typeWork, unit } of dto) {
        // Проверяем существование

        const findedTypeWork = await this.typeWorkRepository.findOne({
          where: { name: typeWork },
        });
        const findedName = await this.nameWorkRepository.findOne({
          where: { name: name.trim() },
        });
        const findedUnit = await this.unitRepository.findOne({
          where: { name: unit },
        });
        let isFindedNameTypeWork = false;
        if (findedTypeWork && findedName) {
          const findedNameTypeWork =
            await this.nameWorkTypeWorkRepository.findOne({
              where: {
                nameWorkId: findedName.id,
                typeWorkId: findedTypeWork.id,
              },
            });
          if (findedNameTypeWork) {
            isFindedNameTypeWork = true;
          }
        }

        if (findedTypeWork && findedUnit && !isFindedNameTypeWork) {
          arr.push({
            name,
            typeWorkId: findedTypeWork.id,
            unitId: findedUnit.id,
          });
        }
      }

      const responseArr = [];

      for (const item of arr) {
        const itemCreate = await this.createNoChecks(item);
        responseArr.push(itemCreate);
      }

      return responseArr;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ----------------------------------------------------- //
  // Получим список наименований для одного листа
  async getAllNamesInByListId(id: number) {
    try {
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Создаём наименования и отдаём список
  async createNameWork(dto: CreateNameWorkRowDto[]) {
    try {
      // Отдаём в любом случае наименование
      const arrNames = Promise.all(
        dto.map(async (nameWork) => {
          if ((await this.checkOneByName(nameWork.name)) === false) {
            console.log(false);
            // const newNameWork = await this.createNameWorkDefault({
            //   name: nameWork.name,
            //   unitId: nameWork.unitId,
            //   typeWorkId: [nameWork.typeWorkId],
            // });
            const newNameWork = await this.create({
              name: nameWork.name,
              unitId: nameWork.unitId,
              typeWorkId: [nameWork.typeWorkId],
            });

            if (newNameWork) {
              return {
                id: newNameWork.id,
                name: newNameWork.name,
                typeWorkId: nameWork.typeWorkId,
                unitId: newNameWork.unit.id,
                row: nameWork.row,
                quntity: nameWork.quntity,
              } as CreateNameWorkRowDto;
            }
          }
          const oldNameWork = await this.nameWorkRepository.findOne({
            where: {
              name: nameWork.name,
            },
          });
          return {
            ...nameWork,
            id: oldNameWork.id,
          };
        }),
      );

      return arrNames;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findNameWorksByName(text: string) {
    try {
      const query = `
      SELECT * FROM scopework.name_work
      WHERE name LIKE :textForFind
      ORDER BY CASE WHEN name LIKE :textStart THEN 0 ELSE 1 END, name
      LIMIT 10;
      `;
      const textArr = text.split(' ');
      const replacements = {
        textForFind: `%${textArr.join('%')}%`,
        textStart: `${textArr.join('%')}%`,
      };
      const result = await this.databaseService.executeQuery(
        query,
        replacements,
      );

      return result;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
