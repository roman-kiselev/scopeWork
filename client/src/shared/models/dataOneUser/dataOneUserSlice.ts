import { createSlice } from "@reduxjs/toolkit";
import { scopeWorkApi } from "../../api";
import { IDataOneUserSlice } from "../../interfaces";
import GetAllScopeWork from "./GetAllScopeWork";

const initialState: IDataOneUserSlice = {
    scopeWorkData: [],
    objects: [],
    typeWork: [],
    isLoading: false,
    isError: false,
    dataError: null,
};

export const dataOneUserSlice = createSlice({
    name: "dataOneUser",
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Получаем scopeWork []
        builder.addMatcher(
            scopeWorkApi.endpoints.getAllScopeWorkByUserId.matchPending,
            GetAllScopeWork.pending
        );
        builder.addMatcher(
            scopeWorkApi.endpoints.getAllScopeWorkByUserId.matchFulfilled,
            GetAllScopeWork.fulfilled
        );
        builder.addMatcher(
            scopeWorkApi.endpoints.getAllScopeWorkByUserId.matchRejected,
            GetAllScopeWork.rejected
        );
    },
});

export const dataOneUserReducer = dataOneUserSlice.reducer;
