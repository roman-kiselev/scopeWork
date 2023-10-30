import { IDataShortScopeWork } from "../scopeWork";

export interface IOneObjectDataShort {
    id: number;
    name: string;
    address: string;
    createdAt: Date;
    mainCount: number;
    countTableAddingData: number;
    percentAll: string;
    dataObject: IDataShortScopeWork[];
}
