import { IObjectShort } from "../objects";
import { IUser } from "../users";

type IUserWitoutTypeWork = Omit<IUser, "typeWorks">;

export interface IStorageAndUsersAndObjects {
    idStorage: number;
    name: string;
    address: string;
    users: IUserWitoutTypeWork[];
    objects: IObjectShort[];
}
