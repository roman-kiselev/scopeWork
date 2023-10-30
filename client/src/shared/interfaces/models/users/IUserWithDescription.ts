import { IUserDescription } from "../userDescription";

export interface IUserWithDescription {
    id: number;
    email: string;
    password: string;
    banned: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    userDescription: IUserDescription;
}
