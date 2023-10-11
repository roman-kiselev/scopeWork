import { ITableAddingData, ITableAddingDataDto } from "../../interfaces/models";

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
    }),
});
