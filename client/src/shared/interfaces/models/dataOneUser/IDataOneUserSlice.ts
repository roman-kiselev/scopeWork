import { IDataError, IObjectCreateResponse } from "../../api";
import { IScopeWorkWithData } from "../scopeWork";
import { ITypeWork } from "../typeWork";

export interface IDataOneUserSlice {
    scopeWorkData: IScopeWorkWithData[] | [];
    objects: IObjectCreateResponse[] | [];
    typeWork: ITypeWork[] | [];
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
