import { INameWorkCreateResponse } from "../nameWork";
import { IProvider } from "../providers";

export interface IDataOrderReceipt {
    key: string;
    index: string;
    id: number;
    name: INameWorkCreateResponse | null;
    provider: IProvider | null;
    quantity: string;
    price: string;
}
