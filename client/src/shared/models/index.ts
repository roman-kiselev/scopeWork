import { authReducer } from "./auth";
import { dataOneUserReducer, dataOneUserSlice } from "./dataOneUser";
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
    addNameListForEdit,
    addObject,
    addTypeWork,
    addUsers,
    delForCreate,
    delForEdit,
    editUsers,
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
    addNameListForEdit,
    addObject,
    addTypeWork,
    addUsers,
    authReducer,
    dataOneUserReducer,
    dataOneUserSlice,
    delForCreate,
    delForEdit,
    editList,
    editUsers,
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
