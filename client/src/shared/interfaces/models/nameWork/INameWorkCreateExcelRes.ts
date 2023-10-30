import { IDataError } from "../../api";
import { INameWorkCreateResponse } from "./INameWorkCreateResponse";

export interface INameWorkCreateExcelRes {
    data: INameWorkCreateResponse | IDataError;
}
