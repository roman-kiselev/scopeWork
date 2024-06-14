import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProviderWithTk } from './dto/create-provider-with-tk.dto';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class ProviderService {
    constructor(private clientDatabase: DatabaseService) {}

    async createProvider(dto: CreateProviderDto) {
        try {
            const { name } = dto;
            // Проверяем уникальность имени
            const result = await this.clientDatabase.providers.findMany({
                where: {
                    name,
                },
            });

            if (result.length > 0) {
                throw new HttpException(
                    'Такое имя уже существует',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const data = await this.clientDatabase.providers.create({
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

    async createProviderWithTransportCompany(dto: CreateProviderWithTk) {
        try {
            const { name } = dto;
            const result = await this.clientDatabase.providers.findMany({
                where: {
                    name,
                },
            });
            // Проверяем уникальность имени
            if (result.length > 0) {
                throw new HttpException(
                    'Такое имя уже существует',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const data = await this.clientDatabase.providers.create({
                data: {
                    name: dto.name,
                    address: dto.address,
                },
            });

            if (dto.transportCompanyId && dto.transportCompanyDefault) {
                for (const item of dto.transportCompanyId) {
                    const dataTk =
                        await this.clientDatabase.transportCompanyToProvider.create(
                            {
                                data: {
                                    providersId: data.id,
                                    transportCompanyId: item,
                                    default:
                                        dto.transportCompanyDefault === item,
                                },
                            },
                        );
                }
            }
            if (dto.transportCompanyId && !dto.transportCompanyDefault) {
                const arrData = dto.transportCompanyId;
                for (const item of dto.transportCompanyId) {
                    const dataTk =
                        await this.clientDatabase.transportCompanyToProvider.create(
                            {
                                data: {
                                    providersId: data.id,
                                    transportCompanyId: item,
                                    default: arrData[0] === item,
                                },
                            },
                        );
                }
            }

            const dataResult = await this.clientDatabase.providers.findUnique({
                where: {
                    id: data.id,
                },
                include: {
                    TransportCompanyToProvider: true,
                },
            });

            return dataResult;
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

    async findAll() {
        try {
            const data = await this.clientDatabase.providers.findMany();
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

    async findOneById(id: string) {
        try {
            // Проверка существования поставщика
            const result = await this.clientDatabase.providers.findUnique({
                where: {
                    id: +id,
                },
            });
            if (!result) {
                throw new HttpException(
                    'Такого поставщика не существует',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const data = await this.clientDatabase.providers.findUnique({
                where: {
                    id: +id,
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

    async findOneByIdFull(id: string) {
        try {
            // Проверка существования поставщика
            const result = await this.clientDatabase.providers.findUnique({
                where: {
                    id: +id,
                },
            });
            if (!result) {
                throw new HttpException(
                    'Такого поставщика не существует',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const data = await this.clientDatabase.providers.findUnique({
                where: {
                    id: +id,
                },
                include: {
                    transportCompany: true,
                    TransportCompanyToProvider: true,
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

    async updateOneById() {
        try {
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
