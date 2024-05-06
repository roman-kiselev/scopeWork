import { IOrderReceiptCreateName } from "../order-receipt-name";
import { ICreateOrderReceiptDto } from "./ICreateOrderReceiptDto";

export interface IOrderReceiptResult
    extends Omit<ICreateOrderReceiptDto, "orderReceiptNames"> {
    state: boolean;
    orderReceiptNames: IOrderReceiptCreateName[];
}
