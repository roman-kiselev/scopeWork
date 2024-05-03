import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    IDataOrderReceipt,
    IEditRowByName,
    INameWork,
    IOrderSlice,
    IProvider,
} from "src/shared/interfaces/models";

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
            state.orderReceipt.isLoading = true;
            state.isLoading = true;
            const row = {
                key: (state.orderReceipt.data.length + 1).toString(),
                index: state.orderReceipt.itemIndex + 1,
                id: 0,
                name: null,
                provider: null,
                quantity: "1",
                price: "0",
            } as IDataOrderReceipt;
            state.orderReceipt.itemIndex += 1;
            const data = state.orderReceipt.data.map((item, index) => {
                return {
                    ...item,
                    key: (index + 1).toString(),
                };
            });
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
            let { nameField, value, key } = action.payload;

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
                            value as string;
                    }
                    break;
                case "price":
                    if (findedIndex !== -1) {
                        orderReceipt.data[findedIndex].price = value as string;
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
    },
});

export const ordersReducer = ordersSlice.reducer;
export const { addNewRow, editRow, deleteRow } = ordersSlice.actions;
