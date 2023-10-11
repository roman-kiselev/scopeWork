import { CaseReducer } from "@reduxjs/toolkit";
import { INameListWork, INameWorkListSlice } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class CopyList
    implements CreateHandler<INameWorkListSlice, INameListWork, IDataError>
{
    pending: CaseReducer<INameWorkListSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        INameWorkListSlice,
        { payload: INameListWork; type: string }
    > = (state, action) => {
        state.isLoading = true;
        state.listItem = [...state.listItem, action.payload];
        state.isLoading = false;
    };

    rejected: CaseReducer<INameWorkListSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new CopyList();
