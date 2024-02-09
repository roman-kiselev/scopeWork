import {
    ICreateCandidateDel,
    IDataGetHistoryForNameWorkId,
    IGetHistory,
} from "src/shared/interfaces/api";
import {
    ILogList,
    ITableAddingData,
    ITableAddingDataDto,
} from "../../interfaces/models";

import { mainApi } from "../main";

export const tableAddingDataApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        addData: builder.mutation<ITableAddingData, ITableAddingDataDto>({
            query: (data) => ({
                url: "/table-adding-data",
                method: "POST",
                body: data,
            }),
        }),
        getAllString: builder.query<
            ILogList,
            { page: string; limit: string; dateFrom: string; dateTo: string }
        >({
            query: ({ page, limit, dateFrom, dateTo }) => ({
                url: `/table-adding-data/strings/?page=${page}&limit=${limit}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
                method: "GET",
            }),
        }),
        historyForName: builder.query<
            IDataGetHistoryForNameWorkId[],
            IGetHistory
        >({
            query: ({ nameListId, nameWorkId, scopeWorkId }) => ({
                url: `/table-adding-data/historyForName/?nameListId=${nameListId}&nameWorkId=${nameWorkId}&scopeWorkId=${scopeWorkId}`,
                method: "GET",
            }),
        }),
        remove: builder.mutation<ITableAddingData, { id: number }>({
            query: ({ id }) => ({
                url: `/table-adding-data/remove/${id}`,
                method: "PATCH",
            }),
        }),
        recovery: builder.mutation<ITableAddingData, { id: number }>({
            query: ({ id }) => ({
                url: `/table-adding-data/recovery/${id}`,
                method: "PATCH",
            }),
        }),
        confirm: builder.mutation<
            ITableAddingData,
            { id: number; idDelCandidate: number }
        >({
            query: ({ id, idDelCandidate }) => ({
                url: `/table-adding-data/confirm/${id}/?idDelCandidate=${idDelCandidate}`,
                method: "PATCH",
            }),
        }),
        createCandidateDel: builder.mutation<
            ITableAddingData,
            ICreateCandidateDel
        >({
            query: (data) => ({
                url: `/table-adding-data/createCandidateDel`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});
