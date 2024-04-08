import {
    ICreateTransportCompanyDto,
    ITransportCompany,
} from "src/shared/interfaces";
import { mainManagerApi } from "../main";

export const transportCompanyApi = mainManagerApi.injectEndpoints({
    endpoints: (builder) => ({
        getAll: builder.query<ITransportCompany[] | [], void>({
            query: () => ({
                url: "/transport-company",
                method: "GET",
            }),
        }),
        getById: builder.query<ITransportCompany, { id: number }>({
            query: ({ id }) => ({
                url: `/transport-company/${id}`,
                method: "GET",
            }),
        }),
        create: builder.mutation<ITransportCompany, ICreateTransportCompanyDto>(
            {
                query: (data) => ({
                    url: "/transport-company",
                    method: "POST",
                    body: data,
                }),
            }
        ),
    }),
});
