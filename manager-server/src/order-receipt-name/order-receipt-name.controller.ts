import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderReceiptNameDto } from './dto/create-order-receipt-name.dto';
import { ValidationIdPipe } from './helpers/ValidationIdPipe';
import { OrderReceiptNameService } from './order-receipt-name.service';

@Controller('order-receipt-name')
export class OrderReceiptNameController {
    constructor(
        public orderReceiptNameService: OrderReceiptNameService,
        public readonly client: DatabaseService,
    ) {}

    @Post()
    @UsePipes(ValidationIdPipe)
    async createOne(@Body() dto: CreateOrderReceiptNameDto) {
        return await this.orderReceiptNameService.createOne(dto);
    }
}
