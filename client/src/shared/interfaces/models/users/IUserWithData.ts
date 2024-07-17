import { IObjectShort } from "../objects";
import { IScopeWorkPlusData } from "../scopeWork";

export interface IUserWithData {
    id: number;
    email: string;
    banned: boolean;
    firstName: string;
    lastName: string;
    scopeWorkPlusData: IScopeWorkPlusData[];
    objects: IObjectShort[];
}
