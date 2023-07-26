import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NameWork } from 'src/name-work/name-work.model';
import { ScopeWork } from 'src/scope-work/scope-work.model';
import { CreateTotalVolumeDto } from './dto/total-volume.dto';
import { TotalVolume } from './total-volume.model';

@Injectable()
export class TotalVolumeService {
  constructor(
    @InjectModel(TotalVolume) private totalVolumeRepository: typeof TotalVolume,
    @InjectModel(NameWork) private nameWorkRepository: typeof NameWork,
    @InjectModel(ScopeWork) private scopeWorkRepository: typeof ScopeWork,
  ) {}

  // private async getNumberTotalVolume (scopeWorkId: number) {
  //   try {
  //       // Найдём и отдадаим номер
  //   } catch (e) {
  //     if (e instanceof HttpException) {
  //       throw e;
  //     }
  //     throw new HttpException(
  //       'Ошибка сервера',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async createTotalVolume(dto: CreateTotalVolumeDto) {
    try {
      const { nameWorkId, quantity, scopeWorkId } = dto;
      // Проверяем существование наименования
      const nameWork = await this.nameWorkRepository.findByPk(nameWorkId);
      if (!nameWork) {
        throw new HttpException(
          'Наименования не существует',
          HttpStatus.NOT_FOUND,
        );
      }
      const scopeWork = await this.scopeWorkRepository.findByPk(scopeWorkId);
      if (!scopeWork) {
        throw new HttpException('Номера не существует', HttpStatus.NOT_FOUND);
      }
      if (nameWork && scopeWork) {
        const newTotalVolume = await this.totalVolumeRepository.create(dto);
        return newTotalVolume;
      }
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
