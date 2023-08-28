import { IUser } from "../../interfaces";
import { mainApi } from "../main";

export const userApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<IUser[], void>({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
        }),
    }),
});
