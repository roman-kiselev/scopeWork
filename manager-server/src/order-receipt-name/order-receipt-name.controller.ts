import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderReceiptNameDto } from './dto/create-order-receipt-name.dto';
import { OrderReceiptNameService } from './order-receipt-name.service';

@Controller('order-receipt-name')
export class OrderReceiptNameController {
    constructor(
        public orderReceiptNameService: OrderReceiptNameService,
        public client: DatabaseService,
    ) {}

    @Get('/:id')
    async getAllByOrderId(@Param('id') id: string) {
        return this.orderReceiptNameService.getAllByOrderId(+id);
    }

    @Post()
    // @UsePipes(ValidationIdPipe)
    async createOne(@Body() dto: CreateOrderReceiptNameDto) {
        return await this.orderReceiptNameService.createOne(dto);
    }

    @Post('list')
    async createList() {
        // return this.orderReceiptNameService.createList();
    }
}
