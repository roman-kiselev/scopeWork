import { IUnit } from "../unit";

export interface INameWorkAndUnit {
    id: number;
    name: string;
    unit: IUnit;
    updatedAt: Date;
    createdAt: Date;
    deletedAt: boolean | null;
}
