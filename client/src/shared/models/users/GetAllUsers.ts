import { CaseReducer } from "@reduxjs/toolkit";
import { IUser, IUsersSlice } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class GetAllUsers implements CreateHandler<IUsersSlice, IUser[], IDataError> {
    pending: CaseReducer<IUsersSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };
    fulfilled: CaseReducer<IUsersSlice, { payload: IUser[]; type: string }> = (
        state,
        action
    ) => {
        state.listUsers = action.payload;
        state.isLoading = false;
    };
    rejected: CaseReducer<IUsersSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new GetAllUsers();
