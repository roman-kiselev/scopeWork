import { IRole } from "../roles";

export interface IUser {
    id: number;
    email: string;
    password?: string;
    updatedAt?: Date;
    createdAt?: Date;
    roles: IRole[];
}
