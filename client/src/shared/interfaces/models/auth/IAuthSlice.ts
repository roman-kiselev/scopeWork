export interface IAuthSlice {
    login: string;
    password: string;
    firstname: string;
    lastname: string;
    isAuth: boolean;
    isLoading: boolean;
    isError: boolean;
    dataError: null;
    token: string | null;
}
