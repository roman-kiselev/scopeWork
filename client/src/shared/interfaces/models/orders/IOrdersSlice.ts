import { IOrderReceipt } from "./IOrderReceipt";

export interface IOrderSlice {
    orderReceipt: IOrderReceipt;
    isLoading: boolean;
}
