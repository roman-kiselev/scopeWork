import { createSlice } from "@reduxjs/toolkit";
import { IDataError, IObjectCreateResponse } from "../../interfaces";
import { objectsApi } from "../../api";

interface IObjectsSlice {
    listObject: IObjectCreateResponse[] | [];
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}

const initialState: IObjectsSlice = {
    listObject: [],
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
            (state, action) => {
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
            (state, action) => {
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
    },
});

export const objectReducer = objectSlice.reducer;
