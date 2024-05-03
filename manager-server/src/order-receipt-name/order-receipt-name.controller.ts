import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderReceiptNameDto } from './dto/create-order-receipt-name.dto';
import { OrderReceiptNameService } from './order-receipt-name.service';

@Controller('order-receipt-name')
export class OrderReceiptNameController {
    constructor(public orderReceiptNameService: OrderReceiptNameService) {}

    @Post()
    async createOne(@Body() dto: CreateOrderReceiptNameDto) {
        return await this.orderReceiptNameService.createOne(dto);
    }
}
