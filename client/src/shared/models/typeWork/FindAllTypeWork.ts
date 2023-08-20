import { CaseReducer } from "@reduxjs/toolkit";
import { IDataError } from "../../interfaces";
import { CreateHandler } from "../../interfaces/api/CreateHandler";
import { ITypeWork } from "../../interfaces/models";
import { ITypeWorkSlice } from "./typeWorkSlice";

class FindAllTypeWork
    implements CreateHandler<ITypeWorkSlice, ITypeWork[], IDataError>
{
    pending: CaseReducer<ITypeWorkSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };
    fulfilled: CaseReducer<
        ITypeWorkSlice,
        { payload: ITypeWork[]; type: string }
    > = (state, action) => {
        const data = action.payload;
        state.listTypeWork = data;
        state.isLoading = false;
    };
    rejected: CaseReducer<ITypeWorkSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new FindAllTypeWork();
