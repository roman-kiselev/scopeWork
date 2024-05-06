import {
    ICreateOrderReceiptDto,
    IOrderReceiptResult,
} from "src/shared/interfaces";
import { mainManagerApi } from "../main";

export const orderReceiptApi = mainManagerApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrderReceipt: builder.mutation<any, ICreateOrderReceiptDto>({
            query: (data) => ({
                url: "/order-receipt",
                method: "POST",
                body: data,
            }),
        }),

        getAllOrderReceipt: builder.query<IOrderReceiptResult, void>({
            query: () => ({
                url: "/order-receipt",
                method: "GET",
            }),
        }),
    }),
});
