import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatabaseService } from 'src/database/database.service';
import { AcceptRowDto } from './dto/accept-row.dto';
import { CreateOrderReceiptNameDto } from './dto/create-order-receipt-name.dto';
import { OrderReceiptNameService } from './order-receipt-name.service';

@ApiTags('OrderReceiptName')
@Controller('order-receipt-name')
export class OrderReceiptNameController {
    constructor(
        public orderReceiptNameService: OrderReceiptNameService,
        public client: DatabaseService,
    ) {}

    @Post()
    // @UsePipes(ValidationIdPipe)
    async createOne(@Body() dto: CreateOrderReceiptNameDto) {
        return await this.orderReceiptNameService.createOne(dto);
    }

    @Post('list')
    async createList() {
        // return this.orderReceiptNameService.createList();
    }

    @Patch('/accept-row/:id')
    async acceptRow(@Param('id') id: string, @Body() dto: AcceptRowDto) {
        return await this.orderReceiptNameService.acceptRow(+id, dto);
    }

    @Get('/:id')
    async getAllByOrderId(@Param('id') id: string) {
        return this.orderReceiptNameService.getAllByOrderId(+id);
    }
}
