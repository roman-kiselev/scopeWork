import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { authApi } from "../../api";
import { IAuthSlice, IDataError, IUserToken } from "../../interfaces";

const initialState: IAuthSlice = {
    banned: false,
    email: "",
    id: null,
    roles: [],
    isAuth: false,
    isLoading: false,
    isError: false,
    token: null,
    dataError: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.isAuth = false;
            state.token = null;
        },
    },
    // Start Register //
    extraReducers(builder) {
        builder.addMatcher(
            authApi.endpoints.register.matchPending,
            (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.dataError = null;
            }
        );
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state, action) => {
                state.isAuth = true;
                state.token = action.payload.token;
                state.isLoading = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.register.matchRejected,
            (state, action) => {
                state.isAuth = false;
                state.isError = true;
                const { data, status } = action.payload as IDataError;
                state.dataError = {
                    status: Number(status),
                    data,
                };
                state.isLoading = false;
            }
        );
        // End Register //
        // Start Login //
        builder.addMatcher(
            authApi.endpoints.login.matchPending,
            (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.dataError = null;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action) => {
                state.isAuth = true;
                const { token } = action.payload;
                const user: IUserToken = jwt_decode(token);
                state.id = user.id;
                state.email = user.email;
                state.banned = user.banned;

                const { roles } = user;
                state.roles = roles;
                state.token = token;
                state.isLoading = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.isError = true;
                state.token = null;
                localStorage.removeItem("token");
                const { data, status } = action.payload as IDataError;
                state.dataError = {
                    status: Number(status),
                    data,
                };
            }
        );
        // End Login //
        // Start Check //
        builder.addMatcher(
            authApi.endpoints.check.matchPending,
            (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.dataError = null;
            }
        );
        builder.addMatcher(
            authApi.endpoints.check.matchFulfilled,
            (state, action) => {
                state.isAuth = true;
                const { token } = action.payload;
                const user: IUserToken = jwt_decode(token);
                state.id = user.id;
                state.email = user.email;
                state.banned = user.banned;
                const { roles } = user;
                state.roles = roles;
                state.token = token;
                state.isLoading = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.check.matchRejected,
            (state, action) => {
                state.isAuth = false;
                state.isError = true;
                state.token = null;
                localStorage.removeItem("token");
                const { data, status } = action.payload as IDataError;
                state.dataError = {
                    status: Number(status),
                    data,
                };
                state.isLoading = false;
            }
        );
        // End Check //
    },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
