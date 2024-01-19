import { IRole } from "../../interfaces";
import { mainApi } from "./../main";

export const roleApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRoles: builder.query<IRole[] | [], void>({
            query: () => ({
                url: "/roles",
                method: "GET",
            }),
        }),
        getAllRolesByUserId: builder.query<IRole[] | [], number>({
            query: (id) => ({
                url: `/roles/user/${id}`,
                method: "GET",
            }),
        }),
    }),
});
