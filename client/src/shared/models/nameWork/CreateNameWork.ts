import { CaseReducer } from "@reduxjs/toolkit";
import { INameWorkCreateResponse } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";
import { INameWorkSlice } from "./nameWorkSlice";

class CreateNameWork
    implements
        CreateHandler<INameWorkSlice, INameWorkCreateResponse, IDataError>
{
    pending: CaseReducer<INameWorkSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        INameWorkSlice,
        { payload: INameWorkCreateResponse; type: string }
    > = (state, action) => {
        state.isError = false;
        state.dataError = null;
        state.listNameWork = [...state.listNameWork, action.payload];
        state.isLoading = false;
    };

    rejected: CaseReducer<INameWorkSlice> = (state, action) => {
        state.isError = true;
        state.dataError = action.payload as IDataError;
        state.isLoading = false;
    };
}

export default new CreateNameWork();
