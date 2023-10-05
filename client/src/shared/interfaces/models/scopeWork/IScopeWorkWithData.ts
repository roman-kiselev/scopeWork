import { IObjectCreateResponse } from "../../api";
import { INameWorkWithNameList } from "../nameWork";
import { INameListWork } from "../nameWorkList";
import { ITypeWork } from "../typeWork";
import { IUser } from "../users";

export interface IScopeWorkWithData {
    id: number | null;
    deletedAt: Date | null;
    typeWork: ITypeWork | null;
    object: IObjectCreateResponse | null;
    createdAt: Date | "";
    updatedAt: Date | "";
    listNameWork: INameListWork[] | [];
    users: IUser[] | [];
    namesWorkGeneral: INameWorkWithNameList[] | [];
}
