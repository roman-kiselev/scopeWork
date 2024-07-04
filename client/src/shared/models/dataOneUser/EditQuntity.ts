import { CaseReducer, current } from "@reduxjs/toolkit";
import { IDataOneUserSlice, ITableAddingData } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class EditQuntity
    implements CreateHandler<IDataOneUserSlice, ITableAddingData, IDataError>
{
    pending: CaseReducer<IDataOneUserSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        IDataOneUserSlice,
        { payload: ITableAddingData; type: string }
    > = (state, action) => {
        const { nameListId, nameWorkId } = action.payload;
        // Ищем по id и прибавляем значение
        const arr = current(state.listByScopeWorkId);
        const newArr = arr.map((item) => {
            const { id: currentId, listNameWorkId, tableAddingData } = item;

            if (nameWorkId === currentId && nameListId === listNameWorkId) {
                return {
                    ...item,
                    tableAddingData: [...tableAddingData, action.payload],
                };
            }
            return item;
        });
        state.listByScopeWorkId = newArr;
        // {
        //     "id": 4,
        //     "quntity": 13,
        //     "nameWorkId": 8,
        //     "nameListId": 6,
        //     "scopeWorkId": 4,
        //     "userId": 1,
        //     "updatedAt": "2023-10-09T10:22:09.178Z",
        //     "createdAt": "2023-10-09T10:22:09.178Z"
        //   }

        state.isLoading = false;
    };

    rejected: CaseReducer<IDataOneUserSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new EditQuntity();
