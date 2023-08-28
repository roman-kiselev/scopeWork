import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api";
import { IUsersSlice } from "../../interfaces";
import GetAllUsers from "./GetAllUsers";

const initialState: IUsersSlice = {
    listUsers: [],
    isLoading: false,
    isError: false,
    dataError: null,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            userApi.endpoints.getAllUsers.matchPending,
            GetAllUsers.pending
        );
        builder.addMatcher(
            userApi.endpoints.getAllUsers.matchFulfilled,
            GetAllUsers.fulfilled
        );
        builder.addMatcher(
            userApi.endpoints.getAllUsers.matchRejected,
            GetAllUsers.rejected
        );
    },
});

export const usersReducer = usersSlice.reducer;
