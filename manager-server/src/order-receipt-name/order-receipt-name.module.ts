import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { OrderReceiptNameController } from './order-receipt-name.controller';
import { OrderReceiptNameService } from './order-receipt-name.service';

@Module({
    controllers: [OrderReceiptNameController],
    providers: [OrderReceiptNameService, DatabaseService],
    imports: [DatabaseModule],
    exports: [OrderReceiptNameService],
})
export class OrderReceiptNameModule {}
