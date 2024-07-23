import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTypeWorkDto } from './dto/create-type-work.dto';
import { GetOneByDto } from './dto/get-one-by.dto';
import { TypeWork } from './entities/type-work.model';

@Injectable()
export class TypeWorkService {
    constructor(
        @InjectModel(TypeWork) private typeWorkRepository: typeof TypeWork,
    ) {}

    async getOneBy(
        dto: GetOneByDto,
        organizationId: number,
        params: { withDeleted?: boolean } = {},
    ) {
        const type = await this.typeWorkRepository.findOne({
            where: {
                ...dto.criteria,
                organizationId,
                deletedAt: params.withDeleted ? params.withDeleted : null,
            },
            include: dto.relations || [],
        });
        if (!type) {
            throw new NotFoundException('Type with this criteria not found');
        }
        return type;
    }

    async checkTypeWorksByIds(ids: number[], organizationId: number) {
        const promisesTypeWork = ids.map((item) => {
            return this.getOneBy(
                {
                    criteria: { id: item },
                    relations: [],
                },
                organizationId,
            );
        });
        const typeWorkArr = await Promise.allSettled(promisesTypeWork);
        const promisesResolve = typeWorkArr
            .filter((item) => item.status === 'fulfilled')
            .map((item) => item.value);
        const promisesReject = typeWorkArr
            .filter((item) => item.status === 'rejected')
            .map((item) => item.reason);
        return { promisesResolve, promisesReject };
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async checkOneObjectByName(name: string) {
        try {
            const object = await this.typeWorkRepository.findOne({
                where: {
                    name,
                },
            });
            if (object) {
                return true;
            }
            return false;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async findAllTypeWork() {
        try {
            const objects = this.typeWorkRepository.findAll({
                where: {
                    deletedAt: null,
                },
                include: { all: true },
            });
            if (!objects) {
                throw new HttpException(
                    'Не удалось получить список',
                    HttpStatus.BAD_REQUEST,
                );
            }

            return objects;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async findAllTypeWorkInObject(idObject: number) {
        try {
            const objects = this.typeWorkRepository.findByPk(idObject, {
                include: {
                    all: true,
                    where: {
                        deletedAt: null,
                    },
                },
            });
            if (!objects) {
                throw new HttpException(
                    'Не удалось получить список',
                    HttpStatus.BAD_REQUEST,
                );
            }

            return objects;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async createTypeWork(dto: CreateTypeWorkDto) {
        try {
            const isType = await this.checkOneObjectByName(dto.name);
            if (isType) {
                throw new HttpException(
                    'Тип с таким наименованием существует',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const typeWork = await this.typeWorkRepository.create(dto);
            if (!typeWork) {
                throw new HttpException(
                    'Неудалось создать наименование',
                    HttpStatus.BAD_REQUEST,
                );
            }
            return typeWork;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async findTypeWorkByName(name: string) {
        try {
            const typeWork = await this.typeWorkRepository.findOne({
                rejectOnEmpty: true,
                where: {
                    name,
                },
            });
            if (!typeWork) {
                throw new HttpException(
                    'Такого типа не существует',
                    HttpStatus.NOT_FOUND,
                );
            }
            return typeWork;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in the future.
     * Please use newMethod instead.
     */
    async getAllTypeWorksShort() {
        try {
            const types = await this.typeWorkRepository.findAll();

            return types;
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
