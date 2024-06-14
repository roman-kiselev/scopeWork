import { INameWorkAndUnit } from "./INameWorkAndUnit";

export interface INameWork extends Omit<INameWorkAndUnit, "unit"> {
    unitId: number;
}

// export interface INameWork {
//     id: number;
//     name: string;
// }
