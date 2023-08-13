import {IObjectCreateAttr} from "./IUserCreateAttr";


export interface IObjectCreateResponse extends IObjectCreateAttr {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
