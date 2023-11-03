import { CaseReducer } from "@reduxjs/toolkit";
import { IObjectFullData, IObjectsSlice } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class GetOneObjectWithFullData
    implements CreateHandler<IObjectsSlice, IObjectFullData, IDataError>
{
    pending: CaseReducer<IObjectsSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        IObjectsSlice,
        { payload: IObjectFullData; type: string }
    > = (state, action) => {
        state.oneObjectWithFullData = action.payload;
        state.isLoading = false;
    };

    rejected: CaseReducer<IObjectsSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            status: Number(status),
            data,
        };
    };
}

export default new GetOneObjectWithFullData();
