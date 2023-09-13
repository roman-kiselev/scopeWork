import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INameWorkAndUnit, INameWorkListSlice, Item } from "../../interfaces";

const initialState: INameWorkListSlice = {
    oneItem: {
        name: "",
        description: "",
        typeWorkId: null,
        list: [],
    },
    list: [],
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
            state.list = newData;
        },
        pushData: (state, action: PayloadAction<INameWorkAndUnit[]>) => {
            let newData: Item[] = [];

            for (let i = 0; i < action.payload.length; i++) {
                const { id, name } = action.payload[i];
                const findData = state.list.find(
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
            const data = [...state.list, ...newData].map((item, index) => {
                return {
                    id: item.id,
                    index: index + 1,
                    key: String(item.id),
                    name: item.name,
                    quantity: item.quantity,
                } as Item;
            });
            state.list = data;
            state.oneItem.list = data;
        },
        setNameAndDescription: (
            state,
            action: PayloadAction<{ name?: string; description?: string }>
        ) => {
            console.log(action.payload);
            const { name, description } = action.payload;
            state.oneItem.name = name ? name : "";
            state.oneItem.description = description ? description : "";
        },
    },
    // extraReducers(builder) {},
});
export const {
    getSelectedTypeWork,
    setSelectedTypeWork,
    editList,
    pushData,
    setNameAndDescription,
} = nameWorkListSlice.actions;
export const nameWorkListReducer = nameWorkListSlice.reducer;
