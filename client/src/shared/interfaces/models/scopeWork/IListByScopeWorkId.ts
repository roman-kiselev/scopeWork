import { ITableAddingData } from "../tableAddingData";

export interface IListByScopeWorkId {
    id: number;
    name: string;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    unitId: number;
    quntity: number;
    listNameWorkId: number;
    scopeWorkId: number;
    tableAddingData: ITableAddingData[];
}
