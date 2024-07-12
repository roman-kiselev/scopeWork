import {
    IEditUserDto,
    IUserLogin,
    IUserResponseToken,
    IUserWithDescription,
} from "src/shared/interfaces";
import { IUserRegisterWithOrganization } from "src/shared/interfaces/api/authApi";
import { ITokens } from "src/shared/interfaces/api/authApi/IUserResponseToken";
import { iamApi } from "../main";

interface IAccessTokens {
    data: Omit<ITokens, "refreshToken">;
}

export const authApi = iamApi.injectEndpoints({
    endpoints: (builder) => ({
        refresh: builder.mutation<IAccessTokens, void>({
            query: () => ({
                url: "/authentication/refresh-tokens",
                method: "POST",
                credentials: "include",
            }),
        }),
        login: builder.mutation<IUserResponseToken, IUserLogin>({
            query: (data) => ({
                url: "/authentication/sign-in",
                method: "POST",
                body: data,
            }),
        }),
        registerOrganization: builder.mutation<
            any,
            IUserRegisterWithOrganization
        >({
            query: (data) => ({
                url: "/authentication/sign-up/organization",
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation<any, { password: string }>({
            query: (data) => ({
                url: "/authentication/sign-up",
                method: "POST",
                body: data,
            }),
        }),

        // TODO исправить
        edit: builder.mutation<IUserWithDescription, IEditUserDto>({
            query: (data) => ({
                url: "/auth/edit",
                method: "POST",
                body: data,
            }),
        }),
    }),
    // login: builder.mutation<IUserResponseToken, IUserLogin>({
    //     query: (userData) => ({
    //         url: "/auth/login",
    //         method: "POST",
    //         body: userData,
    //     }),
    // }),
    // register: builder.mutation<IUserResponseToken, IUserRegister>({
    //     query: (userData) => {
    //         return {
    //             url: "/auth/registration",
    //             method: "POST",
    //             body: userData,
    //         };
    //     },
    // }),
    // check: builder.query<IUserResponseToken, void>({
    //     query: () => ({
    //         url: "/auth/check",
    //         method: "GET",
    //     }),
    // }),
    // edit: builder.mutation<IUserWithDescription, IEditUserDto>({
    //     query: (data) => ({
    //         url: "/auth/edit",
    //         method: "POST",
    //         body: data,
    //     }),
    // }),
});
