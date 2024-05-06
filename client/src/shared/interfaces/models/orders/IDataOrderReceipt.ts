import { INameWorkShort } from "../nameWork";
import { IProvider } from "../providers";

export interface IDataOrderReceipt {
    key: string;
    index: number;
    id: number;
    name: INameWorkShort | null;
    provider: IProvider | null;
    quantity: string;
    price: string;
}
