import { Test, TestingModule } from '@nestjs/testing';
import { OrderReceiptController } from './order-receipt.controller';

describe('OrderReceiptController', () => {
  let controller: OrderReceiptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderReceiptController],
    }).compile();

    controller = module.get<OrderReceiptController>(OrderReceiptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
