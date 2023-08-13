import {IObjectCreateAttr} from "./IObjectCreateAttr";


export interface IObjectCreateResponse extends IObjectCreateAttr {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
