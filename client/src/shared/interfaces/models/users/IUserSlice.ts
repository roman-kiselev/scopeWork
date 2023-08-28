import { IDataError } from "../../api";
import { IUser } from "./IUser";

export interface IUsersSlice {
    listUsers: IUser[] | [];
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
