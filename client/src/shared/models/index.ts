import { authReducer } from "./auth";
import {
    nameWorkReducer,
    nameWorkSlice,
    resetSelectedData,
    setDataSelect,
} from "./nameWork";
import {
    editList,
    getSelectedTypeWork,
    nameWorkListReducer,
    nameWorkListSlice,
    pushData,
    resetForOneItem,
    setNameAndDescription,
    setSelectedTypeWork,
} from "./nameWorkList";
import { objectReducer, objectSlice } from "./objects";
import {
    addList,
    addObject,
    addTypeWork,
    addUsers,
    resetScopeWorkData,
    scopeWorkReducer,
    scopeWorkSlice,
    selectedTypeWorkIdInScopeWork,
} from "./scopeWork";
import { typeWorkReducer, typeWorkSlice } from "./typeWork/typeWorkSlice";
import { unitReducer, unitSlice } from "./units";
import { GetAllUsers, usersReducer, usersSlice } from "./users";

export {
    GetAllUsers,
    addList,
    addObject,
    addTypeWork,
    addUsers,
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
    resetForOneItem,
    resetScopeWorkData,
    resetSelectedData,
    scopeWorkReducer,
    scopeWorkSlice,
    selectedTypeWorkIdInScopeWork,
    setDataSelect,
    setNameAndDescription,
    setSelectedTypeWork,
    typeWorkReducer,
    typeWorkSlice,
    unitReducer,
    unitSlice,
    usersReducer,
    usersSlice,
};
