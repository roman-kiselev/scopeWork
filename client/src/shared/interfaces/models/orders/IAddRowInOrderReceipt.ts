import { IDataOrderReceipt } from "./IDataOrderReceipt";

export interface IAddRowInOrderReceipt extends IDataOrderReceipt {
    newRowQuantity: number;
}
