import { IOrderReceiptCreateName } from 'src/interfaces/order-receipt-name/IOrderReceiptCreateName';
import { IOrderCreateWithNames } from 'src/interfaces/order-receipt/IOrderCreateWithNames';
import { CreateOrderReceiptDto } from '../dto/create-order-receipt.dto';
import OrderReceipt from './OrderReceipt';

class OrderReceiptCreate extends OrderReceipt<CreateOrderReceiptDto> {
  private maxIndex: number;
  constructor(dto: CreateOrderReceiptDto) {
    super(dto);
    this.maxIndex = 0;
  }

  private getNames(): IOrderReceiptCreateName[] {
    return JSON.parse(this.getDto().orderReceiptNames);
  }

  private setMaxIndex() {
    const names = this.getNames();
    let max = 0;
    names.forEach((item) => {
      if (item.index > max) {
        max = item.index;
      }
    });
  }

  public getFinishDto(): IOrderCreateWithNames {
    return {
      id: this.getDto().id ?? 0,
      storageId: this.getDto().storageId ?? 0,
      userCreateId: this.getDto().userCreateId,
      names: this.getNames(),
      state: false,
    };
  }
}

export default OrderReceiptCreate;
