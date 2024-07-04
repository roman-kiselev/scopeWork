import { CaseReducer } from "@reduxjs/toolkit";
import { IUserWithDescription, IUsersSlice } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class EditRolesForUser
    implements CreateHandler<IUsersSlice, IUserWithDescription, IDataError>
{
    pending: CaseReducer<IUsersSlice> = (state) => {
        // state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };
    fulfilled: CaseReducer<
        IUsersSlice,
        { payload: IUserWithDescription; type: string }
    > = (state, action) => {
        if (state.oneUserWithDescription) {
            state.oneUserWithDescription.roles = action.payload.roles;
        }

        // state.isLoading = false;
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

export default new EditRolesForUser();
