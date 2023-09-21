import { CaseReducer } from "@reduxjs/toolkit";
import { INameWorkListSlice, IOneItemForListNameWork } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class GetList
    implements
        CreateHandler<
            INameWorkListSlice,
            IOneItemForListNameWork[],
            IDataError
        >
{
    pending: CaseReducer<INameWorkListSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };
    fulfilled: CaseReducer<INameWorkListSlice> = (state, action) => {
        const data = action.payload;
        state.listItem = action.payload;
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

export default new GetList();
