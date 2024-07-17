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

// export interface IScopeWorkPlusData {
//     id: number;
//     deletedAt: string | null;
//     typeWorkId: number;
//     objectId: number;
//     createdAt: string;
//     updatedAt: string;
//     mainCount: number;
//     countTableAddingData: number;
//     percentAll: string;
//     countUser: number;
//     percentOneUserForTotalVolume: string;
//     percentOneUserCompletedVolume: string;
// }

// export interface IObjectShort {
//     id: number;
//     name: string;
//     address: string;
//     deletedAt: string | null;
//     createdAt: string;
//     updatedAt: string;
// }
