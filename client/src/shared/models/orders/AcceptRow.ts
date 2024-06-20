import { CaseReducer } from "@reduxjs/toolkit";
import { IOrderReceiptGetResponse, IOrderSlice } from "src/shared/interfaces";
import { CreateHandler, IDataError } from "src/shared/interfaces/api";

class AcceptRow
    implements CreateHandler<IOrderSlice, IOrderReceiptGetResponse, IDataError>
{
    pending: CaseReducer<IOrderSlice> = (state) => {
        state.orderReceipt.isLoading = true;
        state.orderReceipt.isError = false;
        state.orderReceipt.isSuccess = false;
    };

    fulfilled: CaseReducer<
        IOrderSlice,
        { payload: IOrderReceiptGetResponse; type: string }
    > = (state, action) => {
        console.log(action.payload);
        state.orderReceipt.isError = false;
        state.orderReceipt.isLoading = false;
        state.orderReceipt.isSuccess = true;
        const data = state.orderReceipt.data;
        const findedIndex = data.findIndex(
            (item) => item.id === action.payload.id
        );
        if (findedIndex !== -1) {
            data[findedIndex].status = action.payload.status;
        }
    };

    rejected: CaseReducer<IOrderSlice> = (state, action) => {
        state.orderReceipt.isError = true;
        state.orderReceipt.isLoading = false;
        state.orderReceipt.isSuccess = false;
    };
}

export default AcceptRow;
