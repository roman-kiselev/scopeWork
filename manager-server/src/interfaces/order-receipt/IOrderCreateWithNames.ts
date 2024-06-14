import { CreateOrderReceiptDto } from 'src/order-receipt/dto/create-order-receipt.dto';
import { IOrderReceiptCreateName } from '../order-receipt-name/IOrderReceiptCreateName';

export interface IOrderCreateWithNames
  extends Omit<CreateOrderReceiptDto, 'orderReceiptNames'> {
  names: IOrderReceiptCreateName[];
  state: boolean;
}
