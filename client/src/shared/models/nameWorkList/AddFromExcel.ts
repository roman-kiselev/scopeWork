import { CaseReducer } from "@reduxjs/toolkit";
import { INameWorkFromExcel, INameWorkListSlice } from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class AddFromExcel
    implements
        CreateHandler<INameWorkListSlice, INameWorkFromExcel[], IDataError>
{
    pending: CaseReducer<INameWorkListSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        INameWorkListSlice,
        { payload: INameWorkFromExcel[]; type: string }
    > = (state, action) => {
        state.isLoading = true;

        // Получить состояние из другого слайса role
        // state.list = action.payload.map((item, index) => {
        //     return {
        //         id: item.id,
        //         index: index,
        //         key: index.toString(),
        //         name: item.name,
        //         quntity: item.quntity ? item.quntity : 0,
        //     };
        // });

        state.oneItem.list = action.payload.map((item, index) => {
            return {
                id: item.id,
                index: index + 1,
                key: index.toString(),
                name: item.name,
                quntity: item.quntity ? item.quntity : 0,
            };
        });
        state.isLoading = false;
    };

    rejected: CaseReducer<INameWorkListSlice> = (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const { data, status } = action.payload as IDataError;
        state.dataError = {
            data: data,
            status: Number(status),
        };
    };
}

export default new AddFromExcel();
