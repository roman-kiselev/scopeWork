import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { listNameWorkApi } from "../../api";
import {
    INameListWork,
    IObjectCreateResponse,
    IScopeWorkSlice,
    ITypeWork,
    IUser,
} from "../../interfaces";
import GetOneByTypeWorkId from "./GetOneByTypeWorkId";

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
            state.nameWorksSelected = [];
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
    },
});

export const {
    selectedTypeWorkIdInScopeWork,
    addTypeWork,
    addObject,
    addUsers,
    addList,
    resetScopeWorkData,
} = scopeWorkSlice.actions;
export const scopeWorkReducer = scopeWorkSlice.reducer;
