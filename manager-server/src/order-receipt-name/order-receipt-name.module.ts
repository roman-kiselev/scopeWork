import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderReceiptNameController } from './order-receipt-name.controller';
import { OrderReceiptNameService } from './order-receipt-name.service';

@Module({
  controllers: [OrderReceiptNameController],
  providers: [OrderReceiptNameService],
  imports: [DatabaseModule],
})
export class OrderReceiptNameModule {}
