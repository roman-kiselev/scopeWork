import { IDataError } from "../../api";
import { IRole } from "../roles";

export interface IAuthSlice {
    roles: IRole[];
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
    token: string | null;
}
