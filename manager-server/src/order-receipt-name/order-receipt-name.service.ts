import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderReceiptNameDto } from './dto/create-order-receipt-name.dto';

@Injectable()
export class OrderReceiptNameService {
    constructor(private clientDatabase: DatabaseService) {}

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
        try {
            const data = await this.clientDatabase.orderReceiptName.findMany({
                where: {
                    orderReceiptId: orderId,
                },
                include: {
                    provider: true,
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

    async update(dto: any) {}

    async delete(dto: any) {}
}
