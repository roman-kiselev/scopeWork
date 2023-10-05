import { CaseReducer } from "@reduxjs/toolkit";
import { IScopeWorkSlice, IScopeWorkWithData } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class GetOneScopeWorkById
    implements CreateHandler<IScopeWorkSlice, IScopeWorkWithData, IDataError>
{
    pending: CaseReducer<IScopeWorkSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        IScopeWorkSlice,
        { payload: IScopeWorkWithData; type: string }
    > = (state, action) => {
        state.selectedScopeWorkById.id = action.payload.id;
        state.selectedScopeWorkById.createdAt = action.payload.createdAt;
        state.selectedScopeWorkById.deletedAt = action.payload.deletedAt;
        state.selectedScopeWorkById.listNameWork = action.payload.listNameWork;
        state.selectedScopeWorkById.object = action.payload.object;
        state.selectedScopeWorkById.typeWork = action.payload.typeWork;
        state.selectedScopeWorkById.updatedAt = action.payload.updatedAt;
        state.selectedScopeWorkById.users = action.payload.users;
        state.isLoading = false;
    };

    rejected: CaseReducer<IScopeWorkSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new GetOneScopeWorkById();
