import { IUnitsCreateAttr } from './IUnitCreateAttr'

export interface IUnit extends IUnitsCreateAttr {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}