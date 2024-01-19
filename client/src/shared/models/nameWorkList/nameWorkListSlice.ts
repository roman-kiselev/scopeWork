import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { listNameWorkApi, nameWorkApi } from "../../api";
import {
    INameWorkAndUnit,
    INameWorkListSlice,
    ItemForListNameWork,
} from "../../interfaces";

import AddFromExcel from "./AddFromExcel";
import CopyList from "./CopyList";
import CreateList from "./CreateList";
import EditList from "./EditList";
import GetList from "./GetList";
import GetListByTypeWorkId from "./GetListByTypeWorkId";
import GetOneById from "./GetOneById";

const initialState: INameWorkListSlice = {
    oneItem: {
        idNumber: null,
        dateCreate: null,
        name: "",
        description: "",
        typeWorkId: null,
        list: [],
    },
    list: [],
    lastAddedItem: null,
    listByTypeId: [],
    listItem: [],
    selectedTypeWork: 0,
    dataError: null,
    isError: false,
    isLoading: false,
};

export const nameWorkListSlice = createSlice({
    name: "nameWorkListOther",
    initialState,
    reducers: {
        getSelectedTypeWork: (state) => {
            console.log(state.selectedTypeWork);
        },
        setSelectedTypeWork: (state, action) => {
            state.selectedTypeWork = action.payload;
            state.oneItem.typeWorkId = action.payload;
        },
        editList: (state, action: PayloadAction<ItemForListNameWork[]>) => {
            const newData = action.payload.map((nameWork, index) => {
                return {
                    id: nameWork.id,
                    index: index + 1,
                    key: nameWork.key,
                    name: nameWork.name,
                    quntity: nameWork.quntity,
                } as ItemForListNameWork;
            });
            // state.list = newData;
            state.oneItem.list = newData;
        },
        pushData: (state, action: PayloadAction<INameWorkAndUnit[]>) => {
            let newData: ItemForListNameWork[] = [];

            if (action.payload.length === 0) {
                state.oneItem.list = [];
            } else {
                for (let i = 0; i < action.payload.length; i++) {
                    const { id, name } = action.payload[i];
                    const findData = state.oneItem.list.find(
                        (nameWork) => nameWork.id === id
                    );
                    if (!findData) {
                        newData.push({
                            id: id,
                            key: String(id),
                            name: name,
                            quntity: 0,
                        } as ItemForListNameWork);
                    }
                }
                const data = [...state.oneItem.list, ...newData].map(
                    (item, index) => {
                        return {
                            id: item.id,
                            index: index + 1,
                            key: String(item.id),
                            name: item.name,
                            quntity: item.quntity,
                        } as ItemForListNameWork;
                    }
                );
                // state.list = data;
                state.oneItem.list = data;
            }
        },
        setNameAndDescription: (
            state,
            action: PayloadAction<{ name?: string; description?: string }>
        ) => {
            const {
                name = state.oneItem.name,
                description = state.oneItem.description,
            } = action.payload;

            state.oneItem.name = name ? name : "";

            state.oneItem.description = description ? description : "";
        },

        resetForOneItem: (state) => {
            state.oneItem.idNumber = null;
            state.oneItem.dateCreate = null;
            state.oneItem.description = "";
            state.oneItem.name = "";
            state.oneItem.list = [];
            state.selectedTypeWork = 0;
            state.oneItem.typeWorkId = null;
        },
    },
    extraReducers(builder) {
        // Получаем все списки
        builder.addMatcher(
            listNameWorkApi.endpoints.getAllNames.matchPending,
            GetList.pending
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.getAllNames.matchFulfilled,
            GetList.fulfilled
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.getAllNames.matchRejected,
            GetList.rejected
        );
        // Получаем список по id
        builder.addMatcher(
            listNameWorkApi.endpoints.getOneById.matchPending,
            GetOneById.pending
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.getOneById.matchFulfilled,
            GetOneById.fulfilled
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.getOneById.matchRejected,
            GetOneById.rejected
        );
        // Редактируем список
        builder.addMatcher(
            listNameWorkApi.endpoints.editList.matchPending,
            EditList.pending
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.editList.matchFulfilled,
            EditList.fulfilled
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.editList.matchRejected,
            EditList.rejected
        );
        // Создание и сброс ошибки
        builder.addMatcher(
            listNameWorkApi.endpoints.createList.matchPending,
            CreateList.pending
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.createList.matchFulfilled,
            CreateList.fulfilled
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.createList.matchRejected,
            CreateList.rejected
        );
        // Получаем списки по типу работ
        builder.addMatcher(
            listNameWorkApi.endpoints.getOneByTypeWorkId.matchPending,
            GetListByTypeWorkId.pending
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.getOneByTypeWorkId.matchFulfilled,
            GetListByTypeWorkId.fulfilled
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.getOneByTypeWorkId.matchRejected,
            GetListByTypeWorkId.rejected
        );

        // Копируем список
        builder.addMatcher(
            listNameWorkApi.endpoints.copyList.matchPending,
            CopyList.pending
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.copyList.matchFulfilled,
            CopyList.fulfilled
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.copyList.matchRejected,
            CopyList.rejected
        );

        builder.addMatcher(
            nameWorkApi.endpoints.createExcelForList.matchPending,
            AddFromExcel.pending
        );
        builder.addMatcher(
            nameWorkApi.endpoints.createExcelForList.matchFulfilled,
            AddFromExcel.fulfilled
        );
        builder.addMatcher(
            nameWorkApi.endpoints.createExcelForList.matchRejected,
            AddFromExcel.rejected
        );
    },
});
export const {
    getSelectedTypeWork,
    setSelectedTypeWork,
    editList,
    pushData,
    setNameAndDescription,
    resetForOneItem,
} = nameWorkListSlice.actions;
export const nameWorkListReducer = nameWorkListSlice.reducer;
