import {
    ICreateNameWorkAttr,
    INameWorkAndUnit,
    INameWorkCreateResponse,
} from "../../interfaces";
import { mainApi } from "../main";

interface IQueryGetAllNameWorkByTypeWorkId {
    typeWorkId: number;
}

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
                method: "GET",
            }),
        }),
        getAllNameWorkByTypeWorkId: builder.query<
            INameWorkAndUnit[],
            IQueryGetAllNameWorkByTypeWorkId
        >({
            query: (options) => ({
                url: "name-work/byTypeWork",
                method: "GET",
                params: options,
            }),
        }),
    }),
});
