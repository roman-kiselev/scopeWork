import {
    ICreateProviderDto,
    ICreateProviderWithTkDto,
    IProvider,
} from "src/shared/interfaces";
import { mainManagerApi } from "../main";

export const providerApi = mainManagerApi.injectEndpoints({
    endpoints: (builder) => ({
        createWithTk: builder.mutation<IProvider, ICreateProviderWithTkDto>({
            query: (data) => ({
                url: "/provider/with-tk",
                method: "POST",
                body: data,
            }),
        }),
        create: builder.mutation<IProvider, ICreateProviderDto>({
            query: (data) => ({
                url: "/provider",
                method: "POST",
                body: data,
            }),
        }),
        getAll: builder.query<IProvider[], void>({
            query: () => ({
                url: "/provider",
                method: "GET",
            }),
        }),
        getById: builder.query<IProvider, { id: number }>({
            query: ({ id }) => ({
                url: `/provider/${id}`,
                method: "GET",
            }),
        }),
        getByIdFull: builder.query<IProvider, { id: number }>({
            query: ({ id }) => ({
                url: `/provider/full/${id}`,
                method: "GET",
            }),
        }),
    }),
});
