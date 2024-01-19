import { createSlice } from "@reduxjs/toolkit";
import { authApi, userApi } from "../../api";
import { IUsersSlice } from "../../interfaces";
import EditRolesForUser from "./EditRolesForUser";
import EditUser from "./EditUser";
import GetAllUsers from "./GetAllUsers";
import GetOneUser from "./GetOneUser";

const initialState: IUsersSlice = {
    listUsers: [],
    oneUserWithDescription: null,
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
        // Получим пользователя с описанием
        builder.addMatcher(
            userApi.endpoints.getOneUser.matchPending,
            GetOneUser.pending
        );
        builder.addMatcher(
            userApi.endpoints.getOneUser.matchFulfilled,
            GetOneUser.fulfilled
        );
        builder.addMatcher(
            userApi.endpoints.getOneUser.matchRejected,
            GetOneUser.rejected
        );
        // Редактируем пользователя
        builder.addMatcher(
            authApi.endpoints.edit.matchPending,
            EditUser.pending
        );
        builder.addMatcher(
            authApi.endpoints.edit.matchFulfilled,
            EditUser.fulfilled
        );
        builder.addMatcher(
            authApi.endpoints.edit.matchRejected,
            EditUser.rejected
        );

        builder.addMatcher(
            userApi.endpoints.addRolesForUser.matchPending,
            EditRolesForUser.pending
        );
        builder.addMatcher(
            userApi.endpoints.addRolesForUser.matchFulfilled,
            EditRolesForUser.fulfilled
        );
        builder.addMatcher(
            userApi.endpoints.addRolesForUser.matchRejected,
            EditRolesForUser.rejected
        );
    },
});

export const usersReducer = usersSlice.reducer;
