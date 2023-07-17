import { createSlice } from "@reduxjs/toolkit";
import { IAuthSlice } from "../../interfaces";

const initialState: IAuthSlice = {
    login: "",
    password: "",
    firstname: "",
    lastname: "",
    isAuth: false,
    isLoading: false,
    isError: false,
    token: null,
    dataError: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export const authReducer = authSlice.reducer;
