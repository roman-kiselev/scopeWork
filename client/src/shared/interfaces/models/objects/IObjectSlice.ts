import { IDataError, IObjectCreateResponse } from "../../api";
import { IObjectFullData } from "./IObjectFullData";

export interface IObjectsSlice {
    listObject: IObjectCreateResponse[] | [];
    oneObjectWithFullData: IObjectFullData | null;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
