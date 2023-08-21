import { createSlice } from "@reduxjs/toolkit";
import { nameWorkApi } from "../../api";
import { IDataError, INameWorkCreateResponse } from "../../interfaces";
import FindAllNameWork from "./FindAllNameWork";




export interface INameWorkSlice {
    listNameWork: INameWorkCreateResponse[] | [],
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}


export const initialState: INameWorkSlice = {
    listNameWork: [],
    isLoading: false,
    isError: false,
    dataError: null
}


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
        )
    }
})

export const nameWorkReducer = nameWorkSlice.reducer;