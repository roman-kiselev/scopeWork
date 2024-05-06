import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderReceiptDto } from './dto/create-order-receipt.dto';
import { OrderReceiptService } from './order-receipt.service';

@Controller('order-receipt')
export class OrderReceiptController {
    constructor(public orderReceiptService: OrderReceiptService) {}

    @Get()
    async getAll() {
        return this.orderReceiptService.getAll();
    }

    @Post()
    async create(@Body() dto: CreateOrderReceiptDto) {
        console.log(dto);
        return this.orderReceiptService.create(dto);
    }
}
