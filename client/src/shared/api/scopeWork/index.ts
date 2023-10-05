import {
    ICreateScopeWork,
    IScopeWork,
    IScopeWorkWithData,
} from "../../interfaces/models";
import { mainApi } from "../main";

export const scopeWorkApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllScopeWork: builder.query<IScopeWork[], void>({
            query: () => ({
                url: "/scope-work",
                method: "GET",
            }),
        }),
        getOneByIdScopeWork: builder.query<IScopeWorkWithData, { id: number }>({
            query: (id) => ({
                url: `/scope-work/${id.id}`,
                method: "GET",
            }),
        }),
        create: builder.mutation<IScopeWork, ICreateScopeWork>({
            query: (data) => ({
                url: "/scope-work",
                method: "POST",
                body: data,
            }),
        }),
        getAllScopeWorkByUserId: builder.query<
            IScopeWorkWithData[],
            { id: number }
        >({
            query: (id) => ({
                url: `scope-work/getAllByUserId/${id.id}`,
                method: "GET",
            }),
        }),
    }),
});
