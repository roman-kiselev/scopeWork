import { RoleString } from "src/shared/config";
import { IDataError } from "../../api";

export interface IAuthSlice {
    roles: RoleString[];
    banned: boolean;
    email: string;
    organizationId: number;
    id: number | null;
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
    token: string | null;
}
