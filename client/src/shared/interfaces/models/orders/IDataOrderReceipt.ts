import { INameWork } from "../nameWork";
import { IProvider } from "../providers";

export interface IDataOrderReceipt {
    key: string;
    index: number;
    id: number;
    name: INameWork | null;
    provider: IProvider | null;
    quantity: string;
    price: string;
}
