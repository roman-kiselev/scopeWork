import { IDataError } from "../../api";
import { IRole } from "../roles";

export interface IAuthSlice {
    roles: IRole[];
    banned: boolean;
    email: string;
    id: number | null;
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
    token: string | null;
}
