import { mainApi } from "../main";

export const userApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<>({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
        }),
    }),
});
