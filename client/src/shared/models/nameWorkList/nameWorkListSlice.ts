import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { listNameWorkApi } from "../../api";
import { INameWorkAndUnit, INameWorkListSlice, Item } from "../../interfaces";
import GetList from "./GetList";
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
    // {
    //     idNumber: 1,
    //     dateCreate: "2013-12-12",
    //     name: "Имя",
    //     description: "Описание",
    //     typeWorkId: 2,
    //     list: [],
    // },
    list: [],
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
        editList: (state, action: PayloadAction<Item[]>) => {
            const newData = action.payload.map((nameWork, index) => {
                return {
                    id: nameWork.id,
                    index: index + 1,
                    key: nameWork.key,
                    name: nameWork.name,
                    quantity: nameWork.quantity,
                } as Item;
            });
            // state.list = newData;
            state.oneItem.list = newData;
        },
        pushData: (state, action: PayloadAction<INameWorkAndUnit[]>) => {
            let newData: Item[] = [];

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
                            quantity: 1,
                        } as Item);
                    }
                }
                const data = [...state.oneItem.list, ...newData].map(
                    (item, index) => {
                        return {
                            id: item.id,
                            index: index + 1,
                            key: String(item.id),
                            name: item.name,
                            quantity: item.quantity,
                        } as Item;
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
        addItemFromList: (state, action: PayloadAction<{ id: number }>) => {
            // state.isLoading = true;
            // const { id } = action.payload;
            // // Ищем id в списке и добавляем в  OneItem
            // const findedItem = current(state.listItem).find(
            //     (item) => item.id === id
            // );
            // console.log(findedItem);
            // const newList = findedItem?.nameWorks.map((item, index) => {
            //     return {
            //         id: item.id,
            //         index: index + 1,
            //         key: item.id.toString(),
            //         name: item.name,
            //         quantity: Number(
            //             item.NameList.quntity ? item.NameList.quntity : 0
            //         ),
            //     } as Item;
            // });
            // if (findedItem && newList) {
            //     state.oneItem.idNumber = findedItem.id;
            //     state.oneItem.name = findedItem.name;
            //     state.oneItem.description = findedItem.description;
            //     state.oneItem.typeWorkId = findedItem.typeWorkId;
            //     state.oneItem.dateCreate = findedItem.createdAt;
            //     state.oneItem.list = newList;
            // }
            // state.isLoading = false;
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
