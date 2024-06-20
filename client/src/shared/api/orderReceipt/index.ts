import {
    IAddRowInOrderReceipt,
    IChangeStatusOrder,
    ICreateOrderReceiptDto,
    IOrderReceiptForStorage,
    IOrderReceiptResult,
} from "src/shared/interfaces";
import { mainManagerApi } from "../main";

export const orderReceiptApi = mainManagerApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrderReceipt: builder.query<IOrderReceiptResult[], void>({
            query: () => ({
                url: "/order-receipt",
                method: "GET",
            }),
        }),

        getAllActive: builder.query<IOrderReceiptResult[], void>({
            query: () => ({
                url: "/order-receipt/active",
                method: "GET",
            }),
        }),

        getOneOrderReceipt: builder.query<IOrderReceiptResult, string>({
            query: (id) => ({
                url: `/order-receipt/${id}`,
                method: "GET",
            }),
        }),

        createOrderReceipt: builder.mutation<
            IOrderReceiptResult,
            ICreateOrderReceiptDto
        >({
            query: (data) => ({
                url: "/order-receipt",
                method: "POST",
                body: data,
            }),
        }),

        updateOrderReceipt: builder.mutation<
            any,
            { id: number; dto: ICreateOrderReceiptDto }
        >({
            query: (data) => ({
                url: `/order-receipt/update/${data.id}`,
                method: "PATCH",
                body: data.dto,
            }),
        }),

        updateStateWork: builder.mutation<
            IOrderReceiptForStorage,
            { id: number; dto: IChangeStatusOrder }
        >({
            query: (data) => ({
                url: `/order-receipt/edit-state/${data.id}`,
                method: "PATCH",
                body: data.dto,
            }),
        }),

        addChildrenRow: builder.mutation<
            IOrderReceiptForStorage,
            { id: number; dto: IAddRowInOrderReceipt }
        >({
            query: (data) => ({
                url: `/order-receipt/add-row/${data.id}`,
                method: "PATCH",
                body: data.dto,
            }),
        }),
    }),
});
