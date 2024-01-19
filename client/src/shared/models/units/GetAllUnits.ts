import { CaseReducer } from "@reduxjs/toolkit";
import { IUnit } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";
import { IUnitSlice } from "./unitSlice";

class GetAllUnits implements CreateHandler<IUnitSlice, IUnit[], IDataError> {
    pending: CaseReducer<IUnitSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<IUnitSlice, { payload: IUnit[]; type: string }> = (
        state,
        action
    ) => {
        const data = action.payload;
        state.listUnits = data;
        state.isLoading = false;
    };

    rejected: CaseReducer<IUnitSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new GetAllUnits();
