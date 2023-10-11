import { CaseReducer } from "@reduxjs/toolkit";
import {
    IDataOneUserSlice,
    IListByScopeWorkId,
    IListByScopeWorkIdTest,
} from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class GetListByScopeWorkId
    implements
        CreateHandler<IDataOneUserSlice, IListByScopeWorkId[], IDataError>
{
    pending: CaseReducer<IDataOneUserSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };

    fulfilled: CaseReducer<
        IDataOneUserSlice,
        { payload: IListByScopeWorkId[]; type: string }
    > = (state, action) => {
        state.isLoading = true;
        state.listByScopeWorkId = action.payload;
        const newArr: IListByScopeWorkIdTest[] = action.payload.map(
            (item, index) => {
                const {
                    id,
                    listNameWorkId,
                    name,
                    quntity,
                    scopeWorkId,
                    tableAddingData,
                } = item;
                const allQuntity: number[] = tableAddingData?.map(
                    (item) => item.quntity
                );
                const initialValue = 0;
                const finishPercent = allQuntity.reduce(
                    (accum, currentValue) => accum + currentValue,
                    initialValue
                );
                return {
                    action: id,
                    currentQuntity: "",
                    id,
                    index: (index + 1).toString(),
                    key: index.toString(),
                    listNameWorkId,
                    name,
                    percent: Number(
                        ((finishPercent / quntity) * 100).toFixed(1)
                    ),
                    quntity: quntity.toString(),
                    scopeWorkId,
                } as IListByScopeWorkIdTest;
            }
        );

        state.listByScopeWorkIdTest = newArr;
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

export default new GetListByScopeWorkId();
