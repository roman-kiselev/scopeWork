import { IDataError } from "../../api";

// interface INameWorkListItem {
//     name:
// }

export interface INameWorkListSlice {
    // oneItem: ;
    // list: ;

    isLoading: boolean;
    isError: boolean;
    dataError: IDataError | null;
}
