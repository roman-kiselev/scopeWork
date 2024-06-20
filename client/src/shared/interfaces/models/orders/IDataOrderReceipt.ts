import { INameWorkShort } from "../nameWork";
import { IProvider } from "../providers";

export enum StatusOrderReceiptName {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

export interface IDataOrderReceipt {
    key: string;
    index: number;
    id: number;
    name: INameWorkShort | null;
    provider: IProvider | null;
    quantity: number;
    price: number;
    status: StatusOrderReceiptName;
    rowId: number;
}
