import { IRole } from "../roles";
import { ITypeWork } from "../typeWork";
import { IUserDescription } from "../userDescription";

export interface IUser {
    id: number;
    email: string;
    password?: string;
    updatedAt?: Date;
    createdAt?: Date;
    roles: IRole[];
    typeWorks: ITypeWork[];
    banned: boolean;
    userDescription: IUserDescription;
}
