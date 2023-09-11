import { IDataError } from "../../api";

export interface Item {
    key: string;
    id: number;
    name: string;
    quantity: number;
}

export interface INameWorkListSlice {
    oneItem: Item | null;
    list: Item[] | [];
    selectedTypeWork: number;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
