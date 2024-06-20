import { StatusOrderReceiptName } from "../orders";
import { IProvider } from "../providers";
import { IOrderReceiptCreateName } from "./IOrderReceiptCreateName";

export interface IOrderReceiptGetResponse
    extends Omit<IOrderReceiptCreateName, "providerId"> {
    provider: IProvider;
    status: StatusOrderReceiptName;
    rowId: number;
}
