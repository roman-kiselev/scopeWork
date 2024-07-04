import { IObjectCreateResponse } from "../../api";
import { INameWorkWithNameList } from "../nameWork";
import { INameListWork } from "../nameWorkList";
import { ITypeWork } from "../typeWork";
import { IUser } from "../users";
// interface IMainCountData {
//     listNameWorkId: string[];
//     idScopeWork: string[];
//     quntity: number;
//     isDifference: boolean;
//     quantityDifference: number;
//     addingCount: number;
//     percent: string;
// }
export interface IScopeWorkWithData {
    id: number | null;
    deletedAt: Date | null;
    typeWork: ITypeWork | null;
    objectId?: number | null;
    typeWorkId?: number | null;
    object: IObjectCreateResponse | null;
    createdAt: Date | "";
    updatedAt: Date | "";
    listNameWork: INameListWork[] | [];
    users: IUser[] | [];
    namesWorkGeneral: INameWorkWithNameList[] | [];
    // mainCountData: IMainCountData | null;
    listNameWorkId: string[] | [];
    idScopeWork: string[] | [];
    quntity: number | null;
    isDifference: boolean;
    quantityDifference: number | null;
    addingCount: number | null;
    percent: string | "";
}
