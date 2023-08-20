import { createSlice } from "@reduxjs/toolkit";
import { typeWorkApi } from "../../api";
import { IDataError } from "../../interfaces";
import { ITypeWork } from "../../interfaces/models";
import FindAllTypeWork from "./FindAllTypeWork";

export interface ITypeWorkSlice {
    listTypeWork: ITypeWork[] | [];
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}

export const initialState: ITypeWorkSlice = {
    listTypeWork: [],
    isLoading: false,
    isError: false,
    dataError: null,
};

export const typeWorkSlice = createSlice({
    name: "typeWorkSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            typeWorkApi.endpoints.getAllTypeWork.matchPending,
            FindAllTypeWork.pending
        );
        builder.addMatcher(
            typeWorkApi.endpoints.getAllTypeWork.matchFulfilled,
            FindAllTypeWork.fulfilled
        );
        builder.addMatcher(
            typeWorkApi.endpoints.getAllTypeWork.matchRejected,
            FindAllTypeWork.rejected
        );
    },
});

export const typeWorkReducer = typeWorkSlice.reducer;
