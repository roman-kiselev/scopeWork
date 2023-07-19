import { IDataError } from "../../api";

export interface IAuthSlice {
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
    token: string | null;
}
