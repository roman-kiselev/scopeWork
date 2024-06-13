import { CaseReducer } from "@reduxjs/toolkit";
import { CreateHandler, IDataError } from "src/shared/interfaces/api";
import {
    IDataOrderReceipt,
    IOrderReceiptResult,
    IOrderSlice,
} from "src/shared/interfaces/models";

class CreateOrderReceipt
    implements CreateHandler<IOrderSlice, IOrderReceiptResult, IDataError>
{
    pending: CaseReducer<IOrderSlice> = (state) => {
        state.orderReceipt.isLoading = true;
        state.orderReceipt.isError = false;
        state.orderReceipt.isSuccess = false;
    };
    fulfilled: CaseReducer<
        IOrderSlice,
        { payload: IOrderReceiptResult; type: string }
    > = (state, action) => {
        state.orderReceipt.isError = false;
        state.orderReceipt.isSuccess = true;
        const {
            id,
            userCreateId,
            orderReceiptNames,
            storage,
            state: orderState,
        } = action.payload;

        const data = orderReceiptNames
            .sort((a, b) => a.index - b.index)
            .map((item, index) => {
                return {
                    key: (index + 1).toString(),
                    id: item.id,
                    index: item.index,
                    name: {
                        id: item.nameWorkId,
                        name: item.name,
                    },
                    price: item.price,
                    provider: item.provider,
                    quantity: item.quantity,
                } as IDataOrderReceipt;
            });
        state.orderReceipt.numberOrder = id;
        state.orderReceipt.stateOrder = orderState;
        state.orderReceipt.storage = storage;
        state.orderReceipt.data = data;
        state.orderReceipt.isLoading = false;
    };
    rejected: CaseReducer<IOrderSlice> = (state) => {
        state.orderReceipt.isError = true;
        state.orderReceipt.isLoading = false;
        state.orderReceipt.isSuccess = false;
    };
}

export default CreateOrderReceipt;
