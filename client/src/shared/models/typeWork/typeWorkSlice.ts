import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Writable } from "stream";
import { typeWorkApi } from "../../api";
import { IDataError } from "../../interfaces";
import { ITypeWork } from "../../interfaces/models";

interface ITypeWorkSlice {
    listTypeWork: ITypeWork[] | [];
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}

const initialState: ITypeWorkSlice = {
    listTypeWork: [],
    isLoading: false,
    isError: false,
    dataError: null,
};

const unitPendingHandler: CaseReducer<ITypeWorkSlice> = (state) => {
    state.isLoading = true;
    state.isError = false;
    state.dataError = null;
};

const unitFulfilledHandler: CaseReducer<
    ITypeWorkSlice,
    PayloadAction<ITypeWork[]>
> = (state, action) => {
    const data = action.payload;
    state.listTypeWork = data;
    state.isLoading = false;
};

const unitRejectedHandler: CaseReducer<
    ITypeWorkSlice,
    PayloadAction<FetchBaseQueryError>
> = (state, action) => {
    state.isLoading = false;
    state.isError = true;
    const { data, status } = action.payload;

    // state.dataError = {
    //     data: data,
    //     status: Number(status),
    // };
};

export const typeWorkSlice = createSlice({
    name: "typeWorkSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            typeWorkApi.endpoints.getAllTypeWork.matchPending,
            unitPendingHandler
        );
        builder.addMatcher(
            typeWorkApi.endpoints.getAllTypeWork.matchFulfilled,
            unitFulfilledHandler
        );
        // builder.addMatcher(
        //     typeWorkApi.endpoints.getAllTypeWork.matchRejected,
        //     unitRejectedHandler
        // );
    },
});
