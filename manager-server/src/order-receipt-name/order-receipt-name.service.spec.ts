import { Test, TestingModule } from '@nestjs/testing';
import { OrderReceiptNameService } from './order-receipt-name.service';

describe('OrderReceiptNameService', () => {
  let service: OrderReceiptNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderReceiptNameService],
    }).compile();

    service = module.get<OrderReceiptNameService>(OrderReceiptNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
