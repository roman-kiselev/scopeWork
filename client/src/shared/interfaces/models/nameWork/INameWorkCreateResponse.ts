import { ITypeWork } from "../typeWork";
import { IUnit } from "../unit";

export interface INameWorkCreateResponse {
    id: number;
    name: string;
    unit: IUnit;
    updatedAt: Date;
    createdAt: Date;
    deletedAt: boolean | null;
    typeWorks: ITypeWork[] | null;
}
