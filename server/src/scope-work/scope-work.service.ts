import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ObjectTypeWork } from 'src/objects/objects-type_work.model';
import { ScopeWork } from './scope-work.model';

@Injectable()
export class ScopeWorkService {
  constructor(
    @InjectModel(ScopeWork) private scopeWorkRepository: typeof ScopeWork,
    @InjectModel(ObjectTypeWork)
    private objectTypeWorkRepository: typeof ObjectTypeWork,
  ) {}

  async createScopeWork(idObjectTypeWork: number) {
    try {
      console.log(idObjectTypeWork);
      // Проверить существует ли тип работ
      const isObjectTypeWork = await this.objectTypeWorkRepository.findByPk(
        idObjectTypeWork,
      );
      if (!isObjectTypeWork) {
        throw new HttpException('Связи не существует', HttpStatus.BAD_REQUEST);
      }
      const scopeWork = await this.scopeWorkRepository.create({
        objectTypeWorkId: idObjectTypeWork,
      });

      if (!scopeWork) {
        throw new HttpException('Не удалось создать', HttpStatus.BAD_REQUEST);
      }
      await scopeWork.update({
        value: scopeWork.id,
      });
      // await scopeWork.$add('objectTypeWorkId', idObjectTypeWork);

      return scopeWork;
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

  async getAllScopeWork() {
    try {
      const scopeWorks = await this.scopeWorkRepository.findAll({
        include: { all: true },
      });
      return scopeWorks;
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
