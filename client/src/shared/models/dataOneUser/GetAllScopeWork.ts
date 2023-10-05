import { CaseReducer } from "@reduxjs/toolkit";
import { IDataOneUserSlice, IScopeWorkWithData } from "../../interfaces";
import {
    CreateHandler,
    IDataError,
    IObjectCreateResponse,
} from "../../interfaces/api";

class GetAllScopeWork
    implements
        CreateHandler<IDataOneUserSlice, IScopeWorkWithData[], IDataError>
{
    pending: CaseReducer<IDataOneUserSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        IDataOneUserSlice,
        { payload: IScopeWorkWithData[]; type: string }
    > = (state, action) => {
        state.scopeWorkData = action.payload;
        const objects: IObjectCreateResponse[] = [];
        for (const { object } of action.payload) {
            if (object) {
                objects.push(object);
            }
        }
        state.objects = objects;
        state.isLoading = false;
    };

    rejected: CaseReducer<IDataOneUserSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new GetAllScopeWork();
