import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roles: [],
    isAuth: false,
    isLoading: false,
    isError: false,
    dataError: null,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
});
