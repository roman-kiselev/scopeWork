import { createSlice } from "@reduxjs/toolkit";
import { nameWorkApi } from "../../api";
import { IDataError, INameWorkCreateResponse } from "../../interfaces";
import CreateNameWork from "./CreateNameWork";
import FindAllNameWork from "./FindAllNameWork";

export interface INameWorkSlice {
    listNameWork: INameWorkCreateResponse[] | [];
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}

export const initialState: INameWorkSlice = {
    listNameWork: [],
    isLoading: false,
    isError: false,
    dataError: null,
};

export const nameWorkSlice = createSlice({
    name: "nameWorkSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            nameWorkApi.endpoints.getAllNameWork.matchPending,
            FindAllNameWork.pending
        );
        builder.addMatcher(
            nameWorkApi.endpoints.getAllNameWork.matchFulfilled,
            FindAllNameWork.fulfilled
        );
        builder.addMatcher(
            nameWorkApi.endpoints.getAllNameWork.matchRejected,
            FindAllNameWork.rejected
        );

        builder.addMatcher(
            nameWorkApi.endpoints.createNameWork.matchPending,
            CreateNameWork.pending
        );
        builder.addMatcher(
            nameWorkApi.endpoints.createNameWork.matchFulfilled,
            CreateNameWork.fulfilled
        );
        builder.addMatcher(
            nameWorkApi.endpoints.createNameWork.matchRejected,
            CreateNameWork.rejected
        );
    },
});

export const nameWorkReducer = nameWorkSlice.reducer;
