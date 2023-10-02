import { CaseReducer } from "@reduxjs/toolkit";
import { INameListWork, IScopeWorkSlice } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class GetOneByTypeWorkId
    implements CreateHandler<IScopeWorkSlice, INameListWork[], IDataError>
{
    pending: CaseReducer<IScopeWorkSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        IScopeWorkSlice,
        { payload: INameListWork[]; type: string }
    > = (state, action) => {
        state.nameWorksSelected = action.payload;
        state.isLoading = false;
    };

    rejected: CaseReducer<IScopeWorkSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new GetOneByTypeWorkId();
