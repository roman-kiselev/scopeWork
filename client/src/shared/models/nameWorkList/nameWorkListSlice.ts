import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INameWorkAndUnit, INameWorkListSlice } from "../../interfaces";

const initialState: INameWorkListSlice = {
    oneItem: null,
    list: [
        // {
        //     id: 1,
        //     key: String(1),
        //     name: "Не кран",
        //     quantity: 16,
        // },
        // {
        //     id: 2,
        //     key: String(2),
        //     name: "Не кран 100",
        //     quantity: 6,
        // },
    ],
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
        },
        editList: (state, action) => {
            state.list = action.payload;
        },
        pushData: (state, action: PayloadAction<INameWorkAndUnit[]>) => {
            // Если массив пуст
            if (state.list.length === 0) {
                const { id, name } = action.payload[0];
                state.list = [
                    {
                        id: id,
                        key: String(id),
                        name: name,
                        quantity: 1,
                    },
                ];
            }
            // const newData = action.payload.map((item) => {
            //     const findItem = state.list.find((name) => name.id === item.id);
            //     if (!findItem && state.list.length > 0) {
            //         const { id, name } = item;
            //         return {
            //             id: id,
            //             key: String(id),
            //             name: name,
            //             quantity: 1,
            //         } as Item;
            //     }
            //     return findItem;
            // });
            // state.list = [...state.list, ...newData];
        },
    },
    // extraReducers(builder) {},
});
export const { getSelectedTypeWork, setSelectedTypeWork, editList, pushData } =
    nameWorkListSlice.actions;
export const nameWorkListReducer = nameWorkListSlice.reducer;
