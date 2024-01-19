import {
    ICreateNameWorkAttr,
    ICreateNameWorkExcel,
    ICreateNameWorkForList,
    INameWorkAndUnit,
    INameWorkCreateResponse,
    INameWorkFromExcel,
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

        createArr: builder.mutation<any, ICreateNameWorkExcel[]>({
            query: (data) => ({
                url: "/name-work/arr",
                method: "POST",
                body: data,
            }),
        }),

        // INameWorkFromExcel
        // ICreateNameWorkForList
        createExcelForList: builder.mutation<
            INameWorkFromExcel[],
            ICreateNameWorkForList[]
        >({
            query: (data) => ({
                url: "/name-work/createExcel",
                method: "POST",
                body: data,
            }),
        }),
    }),
});
