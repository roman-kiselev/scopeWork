import { INameListWork, IOneItemForListNameWork } from "../../interfaces";
import { mainApi } from "../main";

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
        getOneById: builder.query<INameListWork[], { id: number }>({
            query: (id) => ({
                url: "/list-name-work",
                method: "GET",
                params: id,
            }),
        }),
    }),
});
