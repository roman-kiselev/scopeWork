import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { nameWorkApi } from "../../api";
import {
    IDataError,
    INameWorkAndUnit,
    INameWorkCreateResponse,
} from "../../interfaces";
import CreateNameWork from "./CreateNameWork";
import FindAllNameWork from "./FindAllNameWork";
import FindNameByTypeWork from "./FindNameByTypeWork";

export interface INameWorkSlice {
    listNameWork: INameWorkCreateResponse[] | [];
    listNameWorkForOneType: INameWorkAndUnit[] | [];
    selectedData: INameWorkAndUnit[] | [];
    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}

export const initialState: INameWorkSlice = {
    listNameWork: [],
    listNameWorkForOneType: [],
    selectedData: [],
    isLoading: false,
    isError: false,
    dataError: null,
};

export const nameWorkSlice = createSlice({
    name: "nameWorkSlice",
    initialState,
    reducers: {
        setDataSelect: (state, action: PayloadAction<React.Key[]>) => {
            // Задача получить данные
            const selectedDataByType: INameWorkAndUnit[] = [];

            action.payload.map((number) => {
                const oneItem: INameWorkAndUnit[] = current(
                    state.listNameWorkForOneType
                ).filter((item) => item.id === number);
                return selectedDataByType.push(oneItem[0]);
            });
            state.selectedData = selectedDataByType;
        },
        // addDataFromExcel: (state, action) => {},
        resetSelectedData: (state) => {
            state.selectedData = [];
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            nameWorkApi.endpoints.getAllNameWork.matchPending,
            FindAllNameWork.pending
        );
        builder.addMatcher(
            nameWorkApi.endpoints.getAllNameWork.matchFulfilled,
            FindAllNameWork.fulfilled
        );
        builder.addMatcher(
            nameWorkApi.endpoints.getAllNameWork.matchRejected,
            FindAllNameWork.rejected
        );

        builder.addMatcher(
            nameWorkApi.endpoints.createNameWork.matchPending,
            CreateNameWork.pending
        );
        builder.addMatcher(
            nameWorkApi.endpoints.createNameWork.matchFulfilled,
            CreateNameWork.fulfilled
        );
        builder.addMatcher(
            nameWorkApi.endpoints.createNameWork.matchRejected,
            CreateNameWork.rejected
        );
        // Получаем список по типу
        builder.addMatcher(
            nameWorkApi.endpoints.getAllNameWorkByTypeWorkId.matchPending,
            FindNameByTypeWork.pending
        );
        builder.addMatcher(
            nameWorkApi.endpoints.getAllNameWorkByTypeWorkId.matchFulfilled,
            FindNameByTypeWork.fulfilled
        );
        builder.addMatcher(
            nameWorkApi.endpoints.getAllNameWorkByTypeWorkId.matchRejected,
            FindNameByTypeWork.rejected
        );
    },
});

export const { setDataSelect, resetSelectedData } = nameWorkSlice.actions;
export const nameWorkReducer = nameWorkSlice.reducer;
