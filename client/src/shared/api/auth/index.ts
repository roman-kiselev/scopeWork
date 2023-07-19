import {
    IUserLogin,
    IUserRegister,
    IUserResponseToken,
} from "../../interfaces";
import { mainApi } from "../main";

export const authApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IUserResponseToken, IUserLogin>({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData,
            }),
        }),
        register: builder.mutation<IUserResponseToken, IUserRegister>({
            query: (userData) => {
                console.log(userData);
                return {
                    url: "/auth/registration",
                    method: "POST",
                    body: userData,
                };
            },
        }),
        check: builder.query<IUserResponseToken, void>({
            query: () => ({
                url: "/auth/check",
                method: "GET",
            }),
        }),
    }),
});
