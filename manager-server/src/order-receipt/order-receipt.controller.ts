import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderReceiptDto } from './dto/create-order-receipt.dto';
import { EditOrderWorkStateDto } from './dto/edit-order-work-state.dto';
import { OrderReceiptService } from './order-receipt.service';

@ApiTags('OrderReceipt')
@Controller('order-receipt')
export class OrderReceiptController {
    constructor(public orderReceiptService: OrderReceiptService) {}

    @Get()
    async getAll() {
        return this.orderReceiptService.getAll();
    }

    @Get('/active')
    async getAllActive() {
        return this.orderReceiptService.getAllActive();
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

    @Patch('/edit-state/:id')
    editState(@Param('id') id: string, @Body() dto: EditOrderWorkStateDto) {
        return this.orderReceiptService.addToWork(+id, dto);
    }

    @Patch('/update/:id')
    updateOrderReceipt(
        @Param('id') id: string,
        @Body() dto: CreateOrderReceiptDto,
    ) {
        return this.orderReceiptService.update(+id, dto);
    }

    // @ApiProperty({ description: 'Добавление подстроки' })
    // @Patch('/add-row/:id')
    // addChildrenRow(@Param('id') id: string, @Body() dto: any) {
    //     console.log(dto);
    // }
}

// {
//     newRowQuantity: 10,
//     key: '1',
//     index: 1,
//     id: 2,
//     name: {
//       id: 84,
//       name: 'Кран латунный трехходовой муфтовый  Ø15 VALFEX 11Б27фт1М'
//     },
//     provider: {
//       id: 3,
//       name: 'ООО "Поставщик 12"',
//       address: 'г. Пенза ул. Гагарина д.12'
//     },
//     quantity: 100,
//     price: 15,
//     status: 'PENDING',
//     rowId: 0
//   }
