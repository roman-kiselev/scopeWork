import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { listNameWorkApi, scopeWorkApi } from "../../api";
import {
    INameListWork,
    IObjectCreateResponse,
    IScopeWorkSlice,
    ITypeWork,
    IUser,
} from "../../interfaces";
import GetOneByTypeWorkId from "./GetOneByTypeWorkId";
import GetOneScopeWorkById from "./GetOneScopeWorkById";

const initialState: IScopeWorkSlice = {
    selectedTypeWorkId: "",
    nameWorksSelected: [],
    scopeWorkData: {
        listNameWork: [],
        namesWorkGeneral: [],
        object: null,
        typeWork: null,
        users: [],
    },
    selectedScopeWorkById: {
        id: null,
        deletedAt: null,
        typeWork: null,
        object: null,
        createdAt: "",
        updatedAt: "",
        listNameWork: [],
        namesWorkGeneral: [],
        users: [],
    },
    isError: false,
    isLoading: false,
    dataError: null,
};

export const scopeWorkSlice = createSlice({
    name: "scopeWork",
    initialState,
    reducers: {
        selectedTypeWorkIdInScopeWork: (state, action) => {
            state.selectedTypeWorkId = action.payload;
        },
        addTypeWork: (
            state,
            action: PayloadAction<{
                listTypeWork: ITypeWork[];
                typeWorkId: string;
            }>
        ) => {
            const { listTypeWork, typeWorkId } = action.payload;
            const findedTypeWork = listTypeWork.find(
                (item) => item.id === Number(typeWorkId)
            );
            if (findedTypeWork) {
                state.scopeWorkData.typeWork = findedTypeWork;
            }
        },
        addObject: (
            state,
            action: PayloadAction<{
                listObject: IObjectCreateResponse[];
                objectId: string;
            }>
        ) => {
            const { listObject, objectId } = action.payload;
            const findedObject = listObject.find(
                (item) => item.id === Number(objectId)
            );
            if (findedObject) {
                state.scopeWorkData.object = findedObject;
            }
        },
        addUsers: (
            state,
            action: PayloadAction<{ listUser: IUser[]; listSelected: string[] }>
        ) => {
            state.scopeWorkData.users = [];
            const { listSelected, listUser } = action.payload;

            const arr: IUser[] = [];
            for (let i = 0; i < listSelected.length; i++) {
                const findedUser = listUser.find(
                    (item) => item.id === Number(listSelected[i])
                );
                if (findedUser) {
                    arr.push(findedUser);
                }
            }
            state.scopeWorkData.users = arr;
        },

        addList: (state, action: PayloadAction<{ arrListId: React.Key[] }>) => {
            const { arrListId } = action.payload;
            const mainList = current(state.nameWorksSelected);

            let arr: INameListWork[] = [];
            let listNames = [];
            for (const listId of arrListId) {
                const findedList = mainList.find(
                    ({ id }) => id === Number(listId)
                );
                if (findedList) {
                    arr.push(findedList);
                    listNames = [...findedList.nameWorks];
                }
            }

            state.scopeWorkData.listNameWork = arr;
        },
        resetScopeWorkData: (state) => {
            state.scopeWorkData.listNameWork = [];
            state.scopeWorkData.namesWorkGeneral = [];
            state.scopeWorkData.object = null;
            state.scopeWorkData.typeWork = null;
            state.scopeWorkData.users = [];
            state.selectedTypeWorkId = "";
            state.nameWorksSelected = [];
        },
        delForCreate: (state, action) => {
            const id = action.payload;
            state.scopeWorkData.listNameWork =
                state.scopeWorkData.listNameWork.filter(
                    (item) => item.id !== id
                );
        },
        delForEdit: (state, action) => {
            state.selectedScopeWorkById.listNameWork =
                state.selectedScopeWorkById.listNameWork.filter(
                    (item) => item.id !== action.payload
                );
        },

        addNameListForEdit: (
            state,
            action: PayloadAction<{ arrListId: React.Key[] }>
        ) => {
            const { arrListId } = action.payload;
            const listForPush = [];
            for (const itemKey of arrListId) {
                const findedList = current(state.nameWorksSelected).find(
                    (item) => item.id === itemKey
                );
                if (findedList) {
                    listForPush.push(findedList);
                }
            }
            state.selectedScopeWorkById.listNameWork = [
                ...state.selectedScopeWorkById.listNameWork,
                ...listForPush,
            ];
        },
        editUsers: (
            state,
            action: PayloadAction<{ listUser: IUser[]; listSelected: string[] }>
        ) => {
            const { listSelected, listUser } = action.payload;

            const arr: IUser[] = [];
            for (let i = 0; i < listSelected.length; i++) {
                const findedUser = listUser.find(
                    (item) => item.id === Number(listSelected[i])
                );
                if (findedUser) {
                    arr.push(findedUser);
                }
            }
            state.scopeWorkData.users = [];
            state.selectedScopeWorkById.users = arr;
        },
    },
    extraReducers(builder) {
        // Получаем списки по id
        builder.addMatcher(
            listNameWorkApi.endpoints.getOneByTypeWorkId.matchPending,
            GetOneByTypeWorkId.pending
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.getOneByTypeWorkId.matchFulfilled,
            GetOneByTypeWorkId.fulfilled
        );
        builder.addMatcher(
            listNameWorkApi.endpoints.getOneByTypeWorkId.matchRejected,
            GetOneByTypeWorkId.rejected
        );

        // Получаем объём по id
        builder.addMatcher(
            scopeWorkApi.endpoints.getOneByIdScopeWork.matchPending,
            GetOneScopeWorkById.pending
        );
        builder.addMatcher(
            scopeWorkApi.endpoints.getOneByIdScopeWork.matchFulfilled,
            GetOneScopeWorkById.fulfilled
        );
        builder.addMatcher(
            scopeWorkApi.endpoints.getOneByIdScopeWork.matchRejected,
            GetOneScopeWorkById.rejected
        );
    },
});

export const {
    selectedTypeWorkIdInScopeWork,
    addTypeWork,
    addObject,
    addUsers,
    addList,
    resetScopeWorkData,
    delForCreate,
    delForEdit,
    addNameListForEdit,
    editUsers,
} = scopeWorkSlice.actions;
export const scopeWorkReducer = scopeWorkSlice.reducer;
