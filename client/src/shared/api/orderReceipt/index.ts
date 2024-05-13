import {
    ICreateOrderReceiptDto,
    IOrderReceiptResult,
} from "src/shared/interfaces";
import { mainManagerApi } from "../main";

export const orderReceiptApi = mainManagerApi.injectEndpoints({
    endpoints: (builder) => ({
        getOneOrderReceipt: builder.query<IOrderReceiptResult, string>({
            query: (id) => ({
                url: `/order-receipt/${id}`,
                method: "GET",
            }),
        }),

        createOrderReceipt: builder.mutation<any, ICreateOrderReceiptDto>({
            query: (data) => ({
                url: "/order-receipt",
                method: "POST",
                body: data,
            }),
        }),

        getAllOrderReceipt: builder.query<IOrderReceiptResult[], void>({
            query: () => ({
                url: "/order-receipt",
                method: "GET",
            }),
        }),

        updateOrderReceipt: builder.mutation<any, ICreateOrderReceiptDto>({
            query: (data) => ({
                url: "/order-receipt",
                method: "PUT",
                body: data,
            }),
        }),
    }),
});
