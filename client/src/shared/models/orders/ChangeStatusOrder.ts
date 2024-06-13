import { CaseReducer } from "@reduxjs/toolkit";
import { IOrderReceiptForStorage, IOrderSlice } from "src/shared/interfaces";
import { CreateHandler, IDataError } from "src/shared/interfaces/api";

class ChangeStatusOrder
    implements CreateHandler<IOrderSlice, IOrderReceiptForStorage, IDataError>
{
    pending: CaseReducer<IOrderSlice> = (state) => {
        state.orderReceipt.isLoading = true;
        state.orderReceipt.isError = false;
        state.orderReceipt.isSuccess = false;
    };

    fulfilled: CaseReducer<
        IOrderSlice,
        { payload: IOrderReceiptForStorage; type: string }
    > = (state, action) => {
        state.orderReceipt.isError = false;
        state.orderReceipt.isLoading = false;
        state.orderReceipt.isSuccess = true;
        state.orderReceipt.stateOrder = action.payload.state;
    };

    rejected: CaseReducer<IOrderSlice> = (state, action) => {
        state.orderReceipt.isError = true;
        state.orderReceipt.isLoading = false;
        state.orderReceipt.isSuccess = false;
    };
}

export default ChangeStatusOrder;
