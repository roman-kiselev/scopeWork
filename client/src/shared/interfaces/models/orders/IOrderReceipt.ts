import { IStorage } from "../storage";
import { IDataOrderReceipt } from "./IDataOrderReceipt";

export interface IOrderReceipt {
    itemIndex: number;
    stateOrder: boolean;
    numberOrder: number;
    data: IDataOrderReceipt[] | [];
    storage: IStorage | null;
    total: number;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}
