import { IUserLogin, IUserResponseToken } from "../../interfaces";
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
    }),
});
