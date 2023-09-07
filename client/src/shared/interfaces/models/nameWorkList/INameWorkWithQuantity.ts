import { INameWorkAndUnit } from "../nameWork/INameWorkAndUnit";

export interface INameWorkWithQuantity extends INameWorkAndUnit {
    quantity: number;
}
