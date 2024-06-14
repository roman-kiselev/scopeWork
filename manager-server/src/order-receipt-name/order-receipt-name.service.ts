import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderReceiptNameDto } from './dto/create-order-receipt-name.dto';
import { Status } from './enums/status.enum';

@Injectable()
export class OrderReceiptNameService {
    constructor(private clientDatabase: DatabaseService) {}

    private findForUpdate(
        oldArr: CreateOrderReceiptNameDto[],
        newArr: CreateOrderReceiptNameDto[],
    ) {
        const modifiedObjects: CreateOrderReceiptNameDto[] = [];

        oldArr.forEach((obj1) => {
            const obj2 = newArr.find((o) => o.id === obj1.id);
            if (obj2 && JSON.stringify(obj1) !== JSON.stringify(obj2)) {
                modifiedObjects.push(obj2);
            }
        });

        return modifiedObjects;
    }

    private findForDelete(
        oldArr: CreateOrderReceiptNameDto[],
        newArr: CreateOrderReceiptNameDto[],
    ) {
        const deletedObjects: CreateOrderReceiptNameDto[] = [];

        oldArr.forEach((obj1) => {
            const obj2 = newArr.find((o) => o.id === obj1.id);
            if (!obj2) {
                deletedObjects.push(obj1);
            }
        });

        return deletedObjects;
    }

    async createOne(dto: CreateOrderReceiptNameDto) {
        try {
            const data = await this.clientDatabase.orderReceiptName.create({
                data: {
                    index: dto.index,
                    nameWorkId: dto.nameWorkId,
                    name: dto.name,
                    quantity: dto.quantity,
                    price: dto.price,
                    orderReceiptId: dto.orderReceiptId,
                    providerId: dto.providerId,
                    status: Status.PENDING,
                    rowId: dto.rowId ?? 0,
                },
            });

            return data;
        } catch (e) {
            console.log(e);
            if (e instanceof HttpException) {
                throw e;
            }

            throw new HttpException(
                'Ошибка сервера',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createList(dto: CreateOrderReceiptNameDto[]) {
        try {
            const finishData = await Promise.all(
                dto.map(async (item) => {
                    await this.createOne(item);
                }),
            );

            return finishData;
        } catch (e) {
            console.log(e);
            if (e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(
                'Ошибка сервера',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateOneItem(dto: CreateOrderReceiptNameDto) {
        const data = await this.clientDatabase.orderReceiptName.update({
            where: {
                id: dto.id,
            },
            data: {
                index: dto.index,
                nameWorkId: dto.nameWorkId,
                name: dto.name,
                quantity: dto.quantity,
                price: dto.price,
                orderReceiptId: dto.orderReceiptId,
                providerId: dto.providerId,
            },
        });
    }

    async clearOrder(id: number) {
        const data = await this.clientDatabase.orderReceiptName.findMany({
            where: {
                orderReceiptId: id,
            },
        });

        const dataForDel = data.map((item) => item.id);

        if (dataForDel.length > 0) {
            const dataFinish = Promise.all(
                dataForDel.map(async (itemId) => {
                    await this.clientDatabase.orderReceiptName.delete({
                        where: {
                            id: itemId,
                        },
                    });
                }),
            );

            return HttpStatus.OK;
        }
        return HttpStatus.OK;
    }

    async updateCurrentList(dto: CreateOrderReceiptNameDto[]) {
        try {
            const finishData = Promise.all(
                dto.map(async (item) => {
                    await this.updateOneItem(item);
                }),
            );

            return finishData;
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

    async deleteItemsInCurrentList(dto: CreateOrderReceiptNameDto[]) {
        try {
            const dataForDel = dto.map((item) => item.id);

            const finishData = Promise.all(
                dataForDel.map(async (id) => {
                    await this.clientDatabase.orderReceiptName.delete({
                        where: {
                            id,
                        },
                    });
                }),
            );

            return finishData;
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

    async getAllByOrderId(orderId: number) {
        const data = await this.clientDatabase.orderReceiptName.findMany({
            where: {
                orderReceiptId: orderId,
            },
            include: {
                provider: true,
            },
        });

        return data;
    }

    async updateList(dto: CreateOrderReceiptNameDto[]) {
        const dataCurrent = await this.clientDatabase.orderReceiptName.findMany(
            {
                where: {
                    orderReceiptId: dto[0].orderReceiptId,
                },
            },
        );
        const dataForAdd = dto.filter((item) => item.id === 0);
        const dataForUpdate = this.findForUpdate(dataCurrent, dto);
        const dataForDelete = this.findForDelete(dataCurrent, dto);
        console.log(dataForDelete);
        const addPromise = this.createList(dataForAdd);
        const updatePromise = this.updateCurrentList(dataForUpdate);
        const delPromise = this.deleteItemsInCurrentList(dataForDelete);

        const [add, update, del] = await Promise.allSettled([
            addPromise,
            updatePromise,
            delPromise,
        ]);

        return this.clientDatabase.orderReceiptName.findMany({
            where: {
                orderReceiptId: dto[0].orderReceiptId,
            },
        });
    }
}
