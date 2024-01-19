import { CaseReducer } from "@reduxjs/toolkit";
import {
    INameListWork,
    INameWorkListSlice,
    ItemForListNameWork,
} from "../../interfaces";
import { CreateHandler, IDataError } from "../../interfaces/api";

class GetOneById
    implements CreateHandler<INameWorkListSlice, INameListWork, IDataError>
{
    pending: CaseReducer<INameWorkListSlice> = (state) => {
        state.isLoading = true;
        state.isError = false;
        state.dataError = null;
    };
    fulfilled: CaseReducer<
        INameWorkListSlice,
        { payload: INameListWork; type: string }
    > = (state, action) => {
        const { id, name, description, createdAt, typeWorkId, nameWorks } =
            action.payload;

        const newList = nameWorks?.map((item, index) => {
            return {
                id: item.id,
                index: index + 1,
                key: item.id.toString(),
                name: item.name,
                quntity: Number(item.NameList.quntity),
            } as ItemForListNameWork;
        });

        state.oneItem.idNumber = id;
        state.oneItem.name = name;
        state.oneItem.description = description;
        state.oneItem.typeWorkId = typeWorkId;
        state.oneItem.dateCreate = createdAt;
        state.oneItem.list = newList;

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

export default new GetOneById();
