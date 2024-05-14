import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { OrderReceiptNameService } from 'src/order-receipt-name/order-receipt-name.service';
import { CreateOrderReceiptDto } from './dto/create-order-receipt.dto';
import OrderReceiptCreate from './helpers/OrderReceiptCreate';

@Injectable()
export class OrderReceiptService {
    constructor(
        private clientDatabase: DatabaseService,
        public orderReceiptName: OrderReceiptNameService,
    ) {}

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

    async update(dto: any) {}

    async delete(dto: any) {}
}
