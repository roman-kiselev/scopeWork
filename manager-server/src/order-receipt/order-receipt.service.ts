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
            if (newDto.id !== 0) {
                const data = await this.clientDatabase.orderReceipt.create({
                    data: {
                        userCreateId: newDto.userCreateId,
                        state: newDto.state,
                        storageId: newDto.storageId,
                    },
                });
                // Получаем id
                // Присваиваем имена
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

    async getOne(dto: any) {}

    async getAll(dto: any) {}

    async update(dto: any) {}

    async delete(dto: any) {}
}
