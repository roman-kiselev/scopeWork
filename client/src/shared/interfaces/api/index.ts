import { CreateHandler } from "./CreateHandler";
import { IUserLogin, IUserRegister, IUserResponseToken } from "./authApi";
import { IDataError } from "./error";
import { IObjectCreateAttr, IObjectCreateResponse } from "./objects";
export type {
    ICreateCandidateDel,
    IDataGetHistoryForNameWorkId,
    IGetHistory,
    ITableAddingData,
} from "./tableAddingData";

export type {
    CreateHandler,
    IDataError,
    IObjectCreateAttr,
    IObjectCreateResponse,
    IUserLogin,
    IUserRegister,
    IUserResponseToken,
};
