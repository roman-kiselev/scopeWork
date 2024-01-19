import { IDataError } from "../../api";
import { INameListWork } from "./INameListWork";

export interface ItemForListNameWork {
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
    list: ItemForListNameWork[] | [];
}

export interface INameWorkListSlice {
    oneItem: IOneItemForListNameWork;
    list: ItemForListNameWork[] | [];
    listItem: INameListWork[] | [];
    lastAddedItem: number | null;
    listByTypeId: INameListWork[] | [];
    selectedTypeWork: number;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
