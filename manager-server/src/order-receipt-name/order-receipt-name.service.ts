import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderReceiptNameDto } from './dto/create-order-receipt-name.dto';

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

    async createList(dto: CreateOrderReceiptNameDto[]) {
        try {
            // console.log(dto);
            // const data = await this.clientDatabase.orderReceiptName.createMany({
            //     data: dto,
            // });
            const data = [];
            for (const item of dto) {
                data.push(await this.createOne(item));
            }
            console.log(data);
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

    async getOne(dto: any) {}

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
        const dataForAdd = dto.filter((item) => item.id === 0);
        const dataCurrent = await this.clientDatabase.orderReceiptName.findMany(
            {
                where: {
                    orderReceiptId: dto[0].orderReceiptId,
                },
            },
        );
        const dataForUpdate = this.findForUpdate(dataCurrent, dto);
        console.log(dataForAdd);
        console.log(dataForUpdate);
        console.log(dataCurrent);

        // return data;
    }

    async delete(dto: any) {}
}
