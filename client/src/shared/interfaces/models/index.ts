import { IAuthSlice } from "./auth";
import {
    IDataOneUserSlice,
    IEditOneQuntityPayload,
    IListByScopeWorkIdTest,
    IListData,
    IValueForListData,
} from "./dataOneUser";
import { INameListForNameWork } from "./nameList";
import {
    ICreateNameWorkAttr,
    ICreateNameWorkExcel,
    INameWorkAndUnit,
    INameWorkCreateResponse,
    INameWorkWithNameList,
} from "./nameWork";
import {
    INameListWork,
    INameWorkListSlice,
    INameWorkWithQuantity,
    IOneItemForListNameWork,
    Item,
} from "./nameWorkList";
import { IRole } from "./roles";
import {
    ICreateScopeWork,
    IDataShortScopeWork,
    IEditScopeWork,
    IListByScopeWorkId,
    IScopeWork,
    IScopeWorkData,
    IScopeWorkPlusData,
    IScopeWorkSlice,
    IScopeWorkWithData,
} from "./scopeWork";
import {
    ILogList,
    ITableAddingData,
    ITableAddingDataDto,
} from "./tableAddingData";
import { ITypeWork } from "./typeWork";
import { IUnit, IUnitsCreateAttr } from "./unit";
import { IUserDescription } from "./userDescription";
import {
    IEditUserDto,
    IUser,
    IUserToken,
    IUserWithData,
    IUserWithDescription,
    IUsersSlice,
} from "./users";

import {
    IFinishUserAdding,
    IListNamesWithData,
    IMainFinishUserAddingForScopeWork,
    IObjectFullData,
    IObjectShort,
    IObjectsSlice,
    IOneObjectDataShort,
    IOneScopeWorkWithData,
} from "./objects";

export type {
    IAuthSlice,
    ICreateNameWorkAttr,
    ICreateNameWorkExcel,
    ICreateScopeWork,
    IDataOneUserSlice,
    IDataShortScopeWork,
    IEditOneQuntityPayload,
    IEditScopeWork,
    IEditUserDto,
    IFinishUserAdding,
    IListByScopeWorkId,
    IListByScopeWorkIdTest,
    IListData,
    IListNamesWithData,
    ILogList,
    IMainFinishUserAddingForScopeWork,
    INameListForNameWork,
    INameListWork,
    INameWorkAndUnit,
    INameWorkCreateResponse,
    INameWorkListSlice,
    INameWorkWithNameList,
    INameWorkWithQuantity,
    IObjectFullData,
    IObjectShort,
    IObjectsSlice,
    IOneItemForListNameWork,
    IOneObjectDataShort,
    IOneScopeWorkWithData,
    IRole,
    IScopeWork,
    IScopeWorkData,
    IScopeWorkPlusData,
    IScopeWorkSlice,
    IScopeWorkWithData,
    ITableAddingData,
    ITableAddingDataDto,
    ITypeWork,
    IUnit,
    IUnitsCreateAttr,
    IUser,
    IUserDescription,
    IUserToken,
    IUserWithData,
    IUserWithDescription,
    IUsersSlice,
    IValueForListData,
    Item,
};
