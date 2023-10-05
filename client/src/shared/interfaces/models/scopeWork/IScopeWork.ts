import { INameListWork } from "../nameWorkList";
import { IUser } from "../users";

export interface IScopeWork {
    id: number;
    deletedAt: Date | null;
    typeWorkId: number;
    objectId: number;
    createdAt: Date;
    updatedAt: Date;
    listNameWork: INameListWork[];
    users: IUser[];
}
