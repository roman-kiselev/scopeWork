import { INameListWork, IOneItemForListNameWork } from "../../interfaces";
import { mainApi } from "../main";
///list-name-work/byTypeWork/2
export const listNameWorkApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNames: builder.query<INameListWork, void>({
            query: () => ({
                url: "/list-name-work",
                method: "GET",
            }),
        }),
        createList: builder.mutation<INameListWork, IOneItemForListNameWork>({
            query: (data) => {
                return {
                    url: "/list-name-work",
                    method: "POST",
                    body: data,
                };
            },
        }),
        editList: builder.mutation<INameListWork, IOneItemForListNameWork>({
            query: (data) => ({
                url: "/list-name-work/edit",
                method: "POST",
                body: data,
            }),
        }),
        getOneById: builder.query<INameListWork, { id: number }>({
            query: (id) => {
                return {
                    url: `/list-name-work/${id.id}`,
                    method: "GET",
                };
            },
        }),
        getOneByTypeWorkId: builder.query<INameListWork[], { id: number }>({
            query: (id) => {
                return {
                    url: `/list-name-work/byTypeWork/${id.id}`,
                    method: "GET",
                };
            },
        }),
        delList: builder.mutation<INameListWork, { id: number }>({
            query: (id) => ({
                url: `/list-name-work/del/${id.id}`,
                method: "DELETE",
            }),
        }),
        copyList: builder.query<INameListWork, { id: number }>({
            query: (id) => {
                return {
                    url: `/list-name-work/copy/${id.id}`,
                    method: "GET",
                };
            },
        }),
    }),
});
