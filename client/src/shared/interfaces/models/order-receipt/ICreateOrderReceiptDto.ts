import { IOrderReceiptGetResponse } from "../order-receipt-name";

export interface ICreateOrderReceiptDto {
    id: number;
    storageId: number;
    userCreateId: number;
    orderReceiptNames: string;
}

export interface ICreateOrderReceiptDtoTwo {
    id: number;
    storageId: number;
    userCreateId: number;
    orderReceiptNames: IOrderReceiptGetResponse;
}
