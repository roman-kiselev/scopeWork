import { IDataOrderReceipt } from "./IDataOrderReceipt";

export interface IOrderReceipt {
    numberOrder: number;
    name: string;
    data: IDataOrderReceipt[] | [];
    total: number;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}
