import { IDataError } from "../../api";

export interface Item {
    index: number;
    key: string;
    id: number;
    name: string;
    quantity: number;
}

export interface IOneItemForListNameWork {
    name: string;
    description: string;
    typeWorkId: number | null;
    list: Item[] | [];
}

export interface INameWorkListSlice {
    oneItem: IOneItemForListNameWork;
    list: Item[] | [];
    selectedTypeWork: number;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
