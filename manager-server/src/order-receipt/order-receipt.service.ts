import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { OrderReceiptNameService } from 'src/order-receipt-name/order-receipt-name.service';
import { CreateOrderReceiptDto } from './dto/create-order-receipt.dto';
import { EditOrderWorkStateDto } from './dto/edit-order-work-state.dto';
import OrderReceiptCreate from './helpers/OrderReceiptCreate';

@Injectable()
export class OrderReceiptService {
    constructor(
        private clientDatabase: DatabaseService,
        public orderReceiptName: OrderReceiptNameService,
    ) {}

    private async findedEmptyProvider() {
        const findedEmpty = await this.clientDatabase.providers.findUnique({
            where: {
                name: 'Пусто',
            },
        });
        let emptyId = findedEmpty ? findedEmpty.id : 0;
        if (!findedEmpty) {
            const data = await this.clientDatabase.providers.create({
                data: {
                    name: 'Пусто',
                    address: 'Пусто',
                },
            });
            emptyId = data.id;
        }

        return emptyId;
    }

    async create(dto: CreateOrderReceiptDto) {
        try {
            const result = new OrderReceiptCreate(dto);
            const newDto = result.getFinishDto();

            const findedOrder =
                await this.clientDatabase.orderReceipt.findUnique({
                    where: {
                        id: newDto.id,
                    },
                });

            const emptyId = await this.findedEmptyProvider();

            if (newDto.id === 0 || findedOrder === null) {
                const data = await this.clientDatabase.orderReceipt.create({
                    data: {
                        userCreateId: newDto.userCreateId,
                        state: newDto.state,
                        storageId: newDto.storageId,
                    },
                });

                const dataFinish = result.setOrderIdAndProvider({
                    orderReceiptId: data.id,
                    providerId: emptyId,
                });

                const dataCreateName =
                    await this.orderReceiptName.createList(dataFinish);

                const dataForResponse = await this.getOne(data.id.toString());
                return dataForResponse;
            }

            const dataForResponse = await this.getOne(
                findedOrder.id.toString(),
            );

            return dataForResponse;
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

    async getOne(id: string) {
        try {
            const data = await this.clientDatabase.orderReceipt.findUnique({
                where: {
                    id: Number(id),
                },
                include: { storage: true },
            });
            const names = await this.orderReceiptName.getAllByOrderId(data.id);

            return {
                ...data,
                orderReceiptNames: names,
            };
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
            const data = await this.clientDatabase.orderReceipt.findMany({
                include: { storage: true },
                orderBy: { id: 'asc' },
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

    async addToWork(id: number, dto: EditOrderWorkStateDto) {
        const isAdmin = dto.userRoles.some((item) => item === 'admin');
        const isUser = await this.clientDatabase.orderReceipt.findUnique({
            where: {
                id: id,
            },
        });

        if (isAdmin || isUser.userCreateId === dto.userId) {
            const data = await this.clientDatabase.orderReceipt.update({
                where: {
                    id: id,
                },
                data: {
                    state: dto.state,
                },
            });

            return data;
        }

        throw new ForbiddenException('Недостаточно прав');
    }

    async update(id: number, dto: CreateOrderReceiptDto) {
        const findedOrder = await this.clientDatabase.orderReceipt.findUnique({
            where: {
                id: id,
            },
        });
        const findedStorage = await this.clientDatabase.storage.findUnique({
            where: {
                id: dto.storageId,
            },
        });

        if (!findedOrder || !findedStorage)
            throw new HttpException(
                'Заказ или склад не найден',
                HttpStatus.NOT_FOUND,
            );

        const result = new OrderReceiptCreate(dto);
        const newDto = result.getNames();

        const data = await this.clientDatabase.orderReceipt.update({
            where: {
                id: id,
            },
            data: {
                storageId: dto.storageId,
            },
        });
        if (newDto.length === 0) {
            this.orderReceiptName.clearOrder(id);
            return {
                ...data,
                orderReceiptNames: dto.orderReceiptNames,
            };
        }

        const emptyId = await this.findedEmptyProvider();

        const dataNames = await this.orderReceiptName.updateList(
            result.setOrderIdAndProvider({
                orderReceiptId: id,
                providerId: emptyId,
            }),
        );

        if (!data) {
            throw new HttpException(
                'Не удалось обновить',
                HttpStatus.BAD_REQUEST,
            );
        }

        return {
            ...data,
            orderReceiptNames: dto.orderReceiptNames,
        };
    }

    async getAllActive() {
        return this.clientDatabase.orderReceipt.findMany({
            where: {
                state: true,
            },
            include: { storage: true },
            orderBy: { id: 'asc' },
        });
    }

    async delete(dto: any) {}
}
