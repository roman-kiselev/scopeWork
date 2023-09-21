import { CaseReducer } from "@reduxjs/toolkit";
import { INameWorkAndUnit } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";
import { INameWorkSlice } from "./nameWorkSlice";

class FindNameByTypeWork
    implements CreateHandler<INameWorkSlice, INameWorkAndUnit[], IDataError>
{
    pending: CaseReducer<INameWorkSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };
    fulfilled: CaseReducer<
        INameWorkSlice,
        { payload: INameWorkAndUnit[]; type: string }
    > = (state, action) => {
        const data = action.payload;
        state.listNameWorkForOneType = data;
        state.isLoading = false;
    };
    rejected: CaseReducer<INameWorkSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new FindNameByTypeWork();
