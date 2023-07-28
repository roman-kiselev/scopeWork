import { IRole } from "../roles";

export interface IUserToken {
    id: number;
    email: string;
    banned: boolean;
    roles: IRole[];
}
