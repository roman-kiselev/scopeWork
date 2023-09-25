import { IDataError } from "../../api";
import { INameListWork } from "./INameListWork";

export interface Item {
    index: number;
    key: string;
    id: number;
    name: string;
    quntity: number;
}

export interface IOneItemForListNameWork {
    idNumber?: null | number;
    dateCreate?: null | string;
    name: string;
    description: string;
    typeWorkId: number | null;
    list: Item[] | [];
}

export interface INameWorkListSlice {
    oneItem: IOneItemForListNameWork;
    list: Item[] | [];
    listItem: INameListWork[] | [];
    lastAddedItem: number | null;
    selectedTypeWork: number;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
