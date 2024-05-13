import { IOrderReceiptCreateName } from "../order-receipt-name";
import { IStorage } from "../storage";
import { ICreateOrderReceiptDto } from "./ICreateOrderReceiptDto";

export interface IOrderReceiptResult
    extends Omit<ICreateOrderReceiptDto, "orderReceiptNames" | "storageId"> {
    state: boolean;
    orderReceiptNames: IOrderReceiptCreateName[];
    storage: IStorage;
}
