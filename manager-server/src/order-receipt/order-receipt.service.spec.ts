import { Test, TestingModule } from '@nestjs/testing';
import { OrderReceiptService } from './order-receipt.service';

describe('OrderReceiptService', () => {
  let service: OrderReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderReceiptService],
    }).compile();

    service = module.get<OrderReceiptService>(OrderReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
