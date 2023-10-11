import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { scopeWorkApi, tableAddingDataApi } from "../../api";
import { IDataOneUserSlice, IEditOneQuntityPayload } from "../../interfaces";
import EditQuntity from "./EditQuntity";
import GetAllScopeWork from "./GetAllScopeWork";
import GetListByScopeWorkId from "./GetListByScopeWorkId";

const initialState: IDataOneUserSlice = {
    scopeWorkData: [],
    oneScopeWorkForOneTab: null,
    listByScopeWorkId: [],
    listByScopeWorkIdTest: [],
    objects: [],
    typeWork: [],
    isLoading: false,
    isError: false,
    dataError: null,
};

export const dataOneUserSlice = createSlice({
    name: "dataOneUser",
    initialState,
    reducers: {
        getDataByTabName: (
            state,
            action: PayloadAction<{ name: string; objectId: number }>
        ) => {
            state.isLoading = true;
            const { name, objectId } = action.payload;
            // Получаем все объёмы для объекта
            const objects = current(state.scopeWorkData).filter(
                (item) => item.objectId === objectId
            );

            let typeData = null;
            for (const data of objects) {
                const { typeWork } = data;

                if (typeWork) {
                    if (typeWork.name === name) {
                        typeData = data;
                    }
                }
            }
            console.log(typeData);
            state.oneScopeWorkForOneTab = typeData;
            state.isLoading = false;
        },
        editOneQuntity: (
            state,
            action: PayloadAction<IEditOneQuntityPayload>
        ) => {
            const arr = current(state.listByScopeWorkIdTest);
            const { id: idPayload, listId, value = "" } = action.payload;
            const newArr = arr.map((item, index) => {
                const { id, listNameWorkId } = item;
                if (idPayload === id && listId === listNameWorkId) {
                    return {
                        ...item,
                        currentQuntity: value,
                    };
                }
                return item;
            });
            state.listByScopeWorkIdTest = newArr;
        },
    },
    extraReducers(builder) {
        // Получаем scopeWork []
        builder.addMatcher(
            scopeWorkApi.endpoints.getAllScopeWorkByUserId.matchPending,
            GetAllScopeWork.pending
        );
        builder.addMatcher(
            scopeWorkApi.endpoints.getAllScopeWorkByUserId.matchFulfilled,
            GetAllScopeWork.fulfilled
        );
        builder.addMatcher(
            scopeWorkApi.endpoints.getAllScopeWorkByUserId.matchRejected,
            GetAllScopeWork.rejected
        );

        // Получение списка с наименованиями
        builder.addMatcher(
            scopeWorkApi.endpoints.getListByScopeWorkId.matchPending,
            GetListByScopeWorkId.pending
        );
        builder.addMatcher(
            scopeWorkApi.endpoints.getListByScopeWorkId.matchFulfilled,
            GetListByScopeWorkId.fulfilled
        );
        builder.addMatcher(
            scopeWorkApi.endpoints.getListByScopeWorkId.matchRejected,
            GetListByScopeWorkId.rejected
        );
        // Изменяем количество
        builder.addMatcher(
            tableAddingDataApi.endpoints.addData.matchPending,
            EditQuntity.pending
        );
        builder.addMatcher(
            tableAddingDataApi.endpoints.addData.matchFulfilled,
            EditQuntity.fulfilled
        );
        builder.addMatcher(
            tableAddingDataApi.endpoints.addData.matchRejected,
            EditQuntity.rejected
        );
    },
});

export const { getDataByTabName, editOneQuntity } = dataOneUserSlice.actions;
export const dataOneUserReducer = dataOneUserSlice.reducer;
