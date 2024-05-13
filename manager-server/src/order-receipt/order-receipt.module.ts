import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderReceiptNameModule } from 'src/order-receipt-name/order-receipt-name.module';
import { OrderReceiptController } from './order-receipt.controller';
import { OrderReceiptService } from './order-receipt.service';

@Module({
    controllers: [OrderReceiptController],
    providers: [OrderReceiptService],
    imports: [DatabaseModule, OrderReceiptNameModule],
})
export class OrderReceiptModule {}
