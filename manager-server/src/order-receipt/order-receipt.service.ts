import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderReceiptDto } from './dto/create-order-receipt.dto';
import OrderReceiptCreate from './helpers/OrderReceiptCreate';

@Injectable()
export class OrderReceiptService {
    constructor(private clientDatabase: DatabaseService) {}

    async create(dto: CreateOrderReceiptDto) {
        try {
            const newDto = new OrderReceiptCreate(dto).getFinishDto();
            const findedOrder =
                await this.clientDatabase.orderReceipt.findFirst({
                    where: {
                        id: newDto.id,
                    },
                });
            console.log(findedOrder);
            if (newDto.id === 0 || findedOrder === null) {
                const data = await this.clientDatabase.orderReceipt.create({
                    data: {
                        userCreateId: newDto.userCreateId,
                        state: newDto.state,
                        storageId: newDto.storageId,
                    },
                });
                // console.log(newDto);
                // console.log(data);

                // Получаем id
                // Присваиваем имена

                return data;
            }

            return findedOrder;
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

    async getOne(dto: any) {}

    async getAll() {
        try {
            const data = await this.clientDatabase.orderReceipt.findMany();
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
