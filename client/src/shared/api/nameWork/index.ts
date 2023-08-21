import { ICreateNameWorkAttr, INameWorkCreateResponse } from "../../interfaces";
import { mainApi } from "../main";

export const nameWorkApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        createNameWork: builder.mutation<
            INameWorkCreateResponse,
            ICreateNameWorkAttr
        >({
            query: (data) => ({
                url: "/name-work",
                method: "POST",
                body: data,
            }),
        }),
        getAllNameWork: builder.query<INameWorkCreateResponse[], void>({
            query: () => ({
                url: "/name-work",
                method: "GET"
            })
        })
    }),
});
