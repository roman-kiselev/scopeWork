import { createSlice } from "@reduxjs/toolkit";
import { objectsApi } from "../../api";
import { IDataError, IObjectsSlice } from "../../interfaces";
import GetOneObjectWithFullData from "./GetOneObjectWithFullData";

const initialState: IObjectsSlice = {
    listObject: [],
    oneObjectWithFullData: null,
    isLoading: false,
    isError: false,
    dataError: null,
};

export const objectSlice = createSlice({
    name: "objects",
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Create Start //
        builder.addMatcher(
            objectsApi.endpoints.create.matchPending,
            (state) => {
                state.isLoading = true;
                state.isError = false;
                state.dataError = null;
            }
        );
        builder.addMatcher(
            objectsApi.endpoints.create.matchFulfilled,
            (state, action) => {
                state.isLoading = false;
                const object = action.payload;
                state.listObject = [...state.listObject, object];
            }
        );
        builder.addMatcher(
            objectsApi.endpoints.create.matchRejected,
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
        // Create End //
        // GetAll Objects Start //
        builder.addMatcher(
            objectsApi.endpoints.getAllObjects.matchPending,
            (state) => {
                state.isLoading = true;
                state.isError = false;
                state.dataError = null;
                state.listObject = [];
            }
        );
        builder.addMatcher(
            objectsApi.endpoints.getAllObjects.matchFulfilled,
            (state, action) => {
                const data = action.payload;
                state.listObject = data;
                state.isLoading = false;
            }
        );
        builder.addMatcher(
            objectsApi.endpoints.getAllObjects.matchRejected,
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
        // GetAll Objects End //
        builder.addMatcher(
            objectsApi.endpoints.getFullDataForOne.matchPending,
            GetOneObjectWithFullData.pending
        );
        builder.addMatcher(
            objectsApi.endpoints.getFullDataForOne.matchFulfilled,
            GetOneObjectWithFullData.fulfilled
        );
        builder.addMatcher(
            objectsApi.endpoints.getFullDataForOne.matchRejected,
            GetOneObjectWithFullData.rejected
        );
    },
});

export const objectReducer = objectSlice.reducer;
