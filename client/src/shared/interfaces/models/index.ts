export type { IAuthSlice } from "./auth";
export type {
    IDataOneUserSlice,
    IEditOneQuntityPayload,
    IListByScopeWorkIdTest,
    IListData,
    IValueForListData,
} from "./dataOneUser";
export type { INameListForNameWork } from "./nameList";
export type {
    ICreateNameWorkAttr,
    ICreateNameWorkExcel,
    ICreateNameWorkForList,
    INameWork,
    INameWorkAndUnit,
    INameWorkCreateResponse,
    INameWorkShort,
    INameWorkWithNameList,
} from "./nameWork";
export type {
    INameListWork,
    INameWorkFromExcel,
    INameWorkListSlice,
    INameWorkWithQuantity,
    IOneItemForListNameWork,
    ItemForListNameWork,
} from "./nameWorkList";
export type { IRole } from "./roles";
export type {
    ICreateScopeWork,
    IDataShortScopeWork,
    IEditScopeWork,
    IListByScopeWorkId,
    IResScopeWorkByUserAndObject,
    IScopeWork,
    IScopeWorkData,
    IScopeWorkPlusData,
    IScopeWorkSlice,
    IScopeWorkWithData,
} from "./scopeWork";
export type {
    ILogList,
    ITableAddingData,
    ITableAddingDataDto,
} from "./tableAddingData";
export type { ITypeWork } from "./typeWork";
export type { IUnit, IUnitsCreateAttr } from "./unit";
export type { IUserDescription } from "./userDescription";
export type {
    IEditUserDto,
    IUser,
    IUserToken,
    IUserWithData,
    IUserWithDescription,
    IUsersSlice,
} from "./users";

export type {
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
    ICreateStorageDto,
    IStorage,
    IStorageAndUsersAndObjects,
} from "./storage";

export type {
    ICreateTransportCompanyDto,
    ITransportCompany,
    ITransportCompanyToProvider,
} from "./transportCompany";

export type {
    IAddRowInOrderReceipt,
    IDataOrderReceipt,
    IEditRowByName,
    IOrderReceipt,
    IOrderSlice,
} from "./orders";
export type {
    ICreateProviderDto,
    ICreateProviderWithTkDto,
    IProvider,
    IProviderWithTk,
} from "./providers";

export type {
    IChangeStatusOrder,
    ICreateOrderReceiptDto,
    IOrderReceiptForStorage,
    IOrderReceiptResult,
} from "./order-receipt";

export type {
    IAcceptRowDto,
    IOrderReceiptCreateName,
    IOrderReceiptGetResponse,
} from "./order-receipt-name";

export type { IMailSendOtpDto, IMailSendOtpResDto } from "./mail";
