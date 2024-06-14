import { Test, TestingModule } from '@nestjs/testing';
import { OrderReceiptNameController } from './order-receipt-name.controller';

describe('OrderReceiptNameController', () => {
  let controller: OrderReceiptNameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderReceiptNameController],
    }).compile();

    controller = module.get<OrderReceiptNameController>(OrderReceiptNameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
