import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderReceiptDto } from './dto/create-order-receipt.dto';
import { OrderReceiptService } from './order-receipt.service';

@Controller('order-receipt')
export class OrderReceiptController {
    constructor(public orderReceiptService: OrderReceiptService) {}

    @Post()
    async create(@Body() dto: CreateOrderReceiptDto) {
        return await this.orderReceiptService.create(dto);
    }
}
