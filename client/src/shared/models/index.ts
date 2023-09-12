import { authReducer } from "./auth";
import { nameWorkReducer, nameWorkSlice, setDataSelect } from "./nameWork";
import {
    editList,
    getSelectedTypeWork,
    nameWorkListReducer,
    nameWorkListSlice,
    pushData,
    setSelectedTypeWork,
} from "./nameWorkList";
import { objectReducer, objectSlice } from "./objects";
import { typeWorkReducer, typeWorkSlice } from "./typeWork/typeWorkSlice";
import { unitReducer, unitSlice } from "./units";
import { GetAllUsers, usersReducer, usersSlice } from "./users";

export {
    GetAllUsers,
    authReducer,
    editList,
    getSelectedTypeWork,
    nameWorkListReducer,
    nameWorkListSlice,
    nameWorkReducer,
    nameWorkSlice,
    objectReducer,
    objectSlice,
    pushData,
    setDataSelect,
    setSelectedTypeWork,
    typeWorkReducer,
    typeWorkSlice,
    unitReducer,
    unitSlice,
    usersReducer,
    usersSlice,
};
