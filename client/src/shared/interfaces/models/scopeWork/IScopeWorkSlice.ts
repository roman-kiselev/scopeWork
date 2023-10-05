import { IDataError, IObjectCreateResponse } from "../../api";
import { INameWorkWithNameList } from "../nameWork";
import { INameListWork } from "../nameWorkList";
import { ITypeWork } from "../typeWork";
import { IUser } from "../users";
import { IScopeWorkWithData } from "./IScopeWorkWithData";

export interface IScopeWorkData {
    listNameWork: INameListWork[] | [];
    namesWorkGeneral: INameWorkWithNameList[] | [];
    object: IObjectCreateResponse | null;
    users: IUser[] | [];
    typeWork: ITypeWork | null;
}

export interface IScopeWorkSlice {
    selectedTypeWorkId: string;
    nameWorksSelected: INameListWork[] | [];
    scopeWorkData: IScopeWorkData;
    selectedScopeWorkById: IScopeWorkWithData;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
