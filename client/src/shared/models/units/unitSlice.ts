import { createSlice } from "@reduxjs/toolkit";
import { unitsApi } from "../../api";
import { IDataError } from "../../interfaces";
import { IUnit } from "../../interfaces/models";
import GetAllUnits from "./GetAllUnits";

export interface IUnitSlice {
    listUnits: IUnit[] | [];
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}

const initialState: IUnitSlice = {
    listUnits: [],
    isLoading: false,
    isError: false,
    dataError: null,
};

export const unitSlice = createSlice({
    name: "unitSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            unitsApi.endpoints.createUnit.matchPending,
            (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.dataError = null;
            }
        );
        builder.addMatcher(
            unitsApi.endpoints.createUnit.matchFulfilled,
            (state, action) => {
                const data = action.payload;
                state.listUnits = [...state.listUnits, action.payload];
                state.isLoading = false;
            }
        );
        builder.addMatcher(
            unitsApi.endpoints.createUnit.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;

                const { data, status } = action.payload as IDataError;
                state.dataError = {
                    status: Number(status),
                    data,
                };
            }
        );
        // GetAll Start
        builder.addMatcher(
            unitsApi.endpoints.getAllUnits.matchPending,
            GetAllUnits.pending
        );
        builder.addMatcher(
            unitsApi.endpoints.getAllUnits.matchFulfilled,
            GetAllUnits.fulfilled
        );
        builder.addMatcher(
            unitsApi.endpoints.getAllUnits.matchRejected,
            GetAllUnits.rejected
        );
    },
});

export const unitReducer = unitSlice.reducer;
