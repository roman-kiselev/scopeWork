import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { authApi } from "../../api";
import { IAuthSlice, IDataError, IUserToken } from "../../interfaces";

const initialState: IAuthSlice = {
    banned: false,
    email: "",
    organizationId: 0,
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
        builder.addMatcher(authApi.endpoints.register.matchPending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.dataError = null;
        });
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
        builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.dataError = null;
            const cookie = new Cookies();
            cookie.remove("refreshToken");
        });
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action) => {
                state.isAuth = true;
                const { accessToken } = action.payload.data;
                const user: IUserToken = jwt_decode(accessToken);
                state.id = user.sub;
                state.email = user.email;
                state.banned = user.banned;
                state.organizationId = user.organizationId;
                const { roles } = user;
                state.roles = roles;
                state.token = accessToken;
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
        builder.addMatcher(authApi.endpoints.refresh.matchPending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.dataError = null;
        });
        builder.addMatcher(
            authApi.endpoints.refresh.matchFulfilled,
            (state, action) => {
                state.isAuth = true;
                const { accessToken } = action.payload.data;
                const user: IUserToken = jwt_decode(accessToken);
                localStorage.setItem("token", accessToken);
                state.id = user.sub;
                state.email = user.email;
                state.banned = user.banned;
                state.organizationId = user.organizationId;
                const { roles } = user;
                state.roles = roles;
                state.token = accessToken;
                state.isLoading = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.refresh.matchRejected,
            (state, action) => {
                state.isAuth = false;
                state.isError = true;
                state.token = null;
                localStorage.removeItem("token");
                const cookies = new Cookies();
                // console.log(cookies.get("refreshToken"));
                cookies.remove("refreshToken");
                const { data, status } = action.payload as IDataError;
                state.dataError = {
                    status: Number(status),
                    data,
                };
                state.isLoading = false;
            }
        );
        // End Check //
        builder.addMatcher(
            authApi.endpoints.loginWithoutPassword.matchPending,
            (state) => {
                state.isLoading = true;
                state.isError = false;
                state.dataError = null;
                const cookie = new Cookies();
                cookie.remove("refreshToken");
            }
        );
        builder.addMatcher(
            authApi.endpoints.loginWithoutPassword.matchFulfilled,
            (state, action) => {
                state.isAuth = true;
                const { accessToken } = action.payload.data;
                const user: IUserToken = jwt_decode(accessToken);
                state.id = user.sub;
                state.email = user.email;
                state.banned = user.banned;
                state.organizationId = user.organizationId;
                const { roles } = user;
                state.roles = roles;
                state.token = accessToken;
                state.isLoading = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.loginWithoutPassword.matchRejected,
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
        //
        builder.addMatcher(authApi.endpoints.logout.matchPending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.dataError = null;
        });
        builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
            state.isAuth = false;
            state.token = null;
            const cookie = new Cookies();
            cookie.remove("refreshToken");
            localStorage.removeItem("token");
            state.isLoading = false;
        });
        builder.addMatcher(
            authApi.endpoints.logout.matchRejected,
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
    },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
