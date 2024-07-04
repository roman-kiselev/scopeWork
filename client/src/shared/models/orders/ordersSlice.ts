import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { orderReceiptApi, orderReceiptNameApi } from "src/shared/api";

import {
    IDataOrderReceipt,
    IEditRowByName,
    INameWork,
    IOrderSlice,
    IProvider,
    IStorage,
} from "src/shared/interfaces/models";
import AcceptRow from "./AcceptRow";
import ChangeStatusOrder from "./ChangeStatusOrder";
import CreateOrderReceipt from "./CreateOrderReceipt";
import GetOneOrderReceipt from "./GetOneOrderReceipt";

const initialState: IOrderSlice = {
    orderReceipt: {
        numberOrder: 0,
        storage: null,
        itemIndex: 0,
        data: [],
        stateOrder: false,
        total: 0,
        isLoading: false,
        isError: false,
        isSuccess: false,
    },
    isLoading: false,
};

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addNewRow: (state) => {
            state.orderReceipt.itemIndex = state.orderReceipt.data.length;
            state.orderReceipt.isLoading = true;
            state.isLoading = true;
            const row = {
                key: (state.orderReceipt.data.length + 1).toString(),
                index: state.orderReceipt.itemIndex + 1,
                id: 0,
                name: null,
                provider: null,
                quantity: 1,
                price: 1,
            } as IDataOrderReceipt;
            state.orderReceipt.itemIndex += 1;
            // const data = state.orderReceipt.data.map((item, index) => {
            //     return {
            //         ...item,
            //         key: (index + 1).toString(),
            //     };
            // });
            state.orderReceipt.data = [...state.orderReceipt.data, row];
            if (state.orderReceipt.data.length > 0) {
                state.orderReceipt.isLoading = false;
                state.isLoading = false;
            }
        },
        editRow: (
            { orderReceipt },
            action: PayloadAction<IEditRowByName<IDataOrderReceipt>>
        ) => {
            const { nameField, value, key } = action.payload;

            const findedIndex = orderReceipt.data.findIndex(
                (item) => item.key === key
            );

            switch (nameField) {
                case "name":
                    if (findedIndex !== -1) {
                        orderReceipt.data[findedIndex].name =
                            value as INameWork;
                    }
                    break;
                case "provider":
                    if (findedIndex !== -1) {
                        orderReceipt.data[findedIndex].provider =
                            value as IProvider;
                    }
                    break;
                case "quantity":
                    if (findedIndex !== -1) {
                        orderReceipt.data[findedIndex].quantity =
                            value as number;
                    }
                    break;
                case "price":
                    if (findedIndex !== -1) {
                        orderReceipt.data[findedIndex].price = value as number;
                    }
                    break;
                default:
                    break;
            }
        },
        deleteRow: (state, action: PayloadAction<string>) => {
            const key = action.payload;
            const filterData = state.orderReceipt.data.filter(
                (item) => item.key !== key
            );
            state.orderReceipt.data = filterData.map((item, index) => {
                return { ...item, key: (index + 1).toString() };
            });
        },

        setStorage: (state, action: PayloadAction<IStorage>) => {
            state.orderReceipt.storage = action.payload;
        },

        resetOrderReceipt: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            orderReceiptApi.endpoints.createOrderReceipt.matchPending,
            new CreateOrderReceipt().pending
        );
        builder.addMatcher(
            orderReceiptApi.endpoints.createOrderReceipt.matchFulfilled,
            new CreateOrderReceipt().fulfilled
        );
        builder.addMatcher(
            orderReceiptApi.endpoints.createOrderReceipt.matchRejected,
            new CreateOrderReceipt().rejected
        );
        // Получение одного
        builder.addMatcher(
            orderReceiptApi.endpoints.getOneOrderReceipt.matchPending,
            new GetOneOrderReceipt().pending
        );
        builder.addMatcher(
            orderReceiptApi.endpoints.getOneOrderReceipt.matchFulfilled,
            new GetOneOrderReceipt().fulfilled
        );
        builder.addMatcher(
            orderReceiptApi.endpoints.getOneOrderReceipt.matchRejected,
            new GetOneOrderReceipt().rejected
        );
        // Изменение статуса

        builder.addMatcher(
            orderReceiptApi.endpoints.updateStateWork.matchPending,
            new ChangeStatusOrder().pending
        );
        builder.addMatcher(
            orderReceiptApi.endpoints.updateStateWork.matchFulfilled,
            new ChangeStatusOrder().fulfilled
        );
        builder.addMatcher(
            orderReceiptApi.endpoints.updateStateWork.matchRejected,
            new ChangeStatusOrder().rejected
        );

        // принимаем строку
        builder.addMatcher(
            orderReceiptNameApi.endpoints.acceptRow.matchPending,
            new AcceptRow().pending
        );
        builder.addMatcher(
            orderReceiptNameApi.endpoints.acceptRow.matchFulfilled,
            new AcceptRow().fulfilled
        );
        builder.addMatcher(
            orderReceiptNameApi.endpoints.acceptRow.matchRejected,
            new AcceptRow().rejected
        );
    },
});

export const ordersReducer = ordersSlice.reducer;
export const { addNewRow, editRow, deleteRow, setStorage, resetOrderReceipt } =
    ordersSlice.actions;
