import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTransportCompany } from './dto/create-transport-company.dto';

@Injectable()
export class TransportCompanyService {
  constructor(private clientDatabase: DatabaseService) {}

  async createTransportCompany(dto: CreateTransportCompany) {
    try {
      const { name } = dto;
      // Проверяем уникальность имени
      const result = await this.clientDatabase.transportCompany.findMany({
        where: {
          name,
        },
      });
      if (!result) {
        throw new HttpException(
          'Такое имя уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.clientDatabase.transportCompany.create({
        data: {
          name: dto.name,
          address: dto.address,
        },
      });

      return data;
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

  async getAll() {
    try {
      const data = await this.clientDatabase.transportCompany.findMany();
      return data;
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

  async getOneById(id: string) {
    try {
      const data = await this.clientDatabase.transportCompany.findUnique({
        where: {
          id: +id,
        },
      });

      if (!data) {
        throw new HttpException(
          'Транспортная компания не найдена',
          HttpStatus.BAD_REQUEST,
        );
      }
      return data;
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
