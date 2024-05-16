import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderReceiptDto } from './dto/create-order-receipt.dto';
import { EditOrderWorkStateDto } from './dto/edit-order-work-state.dto';
import { OrderReceiptService } from './order-receipt.service';

@Controller('order-receipt')
export class OrderReceiptController {
    constructor(public orderReceiptService: OrderReceiptService) {}

    @Get()
    async getAll() {
        return this.orderReceiptService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.orderReceiptService.getOne(id);
    }

    @Post()
    async create(@Body() dto: CreateOrderReceiptDto) {
        // console.log(dto);
        return this.orderReceiptService.create(dto);
    }

    @Post('/edit-state')
    editState(@Body() dto: EditOrderWorkStateDto) {
        return this.orderReceiptService.addToWork(dto);
    }

    @Post('/update')
    updateOrderReceipt(@Body() dto: CreateOrderReceiptDto) {
        return this.orderReceiptService.update(dto);
    }
}
