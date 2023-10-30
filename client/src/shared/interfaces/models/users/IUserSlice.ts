import { IDataError } from "../../api";
import { IUser } from "./IUser";
import { IUserWithDescription } from "./IUserWithDescription";

export interface IUsersSlice {
    listUsers: IUser[] | [];
    oneUserWithDescription: IUserWithDescription | null;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
