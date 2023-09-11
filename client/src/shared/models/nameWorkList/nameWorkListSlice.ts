import { createSlice } from "@reduxjs/toolkit";
import { INameWorkListSlice } from "../../interfaces";

const initialState: INameWorkListSlice = {
    oneItem: null,
    list: [
        {
            id: 1,
            key: String(1),
            name: "Не кран",
            quantity: 16,
        },
        {
            id: 2,
            key: String(2),
            name: "Не кран 100",
            quantity: 6,
        },
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
    },
    // extraReducers(builder) {},
});
export const { getSelectedTypeWork, setSelectedTypeWork, editList } =
    nameWorkListSlice.actions;
export const nameWorkListReducer = nameWorkListSlice.reducer;
