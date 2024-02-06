import { ITableAddingData } from "../tableAddingData";

interface IUserCountAndPercent {
    userId: number;
    count: number;
    percent: string;
    percentTwo: string;
}

export interface IListData {
    nameListId: number;
    quntity: number;
    nameWorkId: number;
    listNameWorkId: number;
    count: number;
    percent: string;
    tableAddingData: ITableAddingData[];
    users: IUserCountAndPercent[];
    scopeWorkId: string;
    name: string;
    unitId: number;
}
