import { authReducer } from "./auth";
import { nameWorkReducer, nameWorkSlice } from "./nameWork";
import { objectReducer, objectSlice } from "./objects";
import { typeWorkReducer, typeWorkSlice } from "./typeWork/typeWorkSlice";
import { unitReducer, unitSlice } from "./units";
import { GetAllUsers, usersReducer, usersSlice } from "./users";

export {
    GetAllUsers,
    authReducer,
    nameWorkReducer,
    nameWorkSlice,
    objectReducer,
    objectSlice,
    typeWorkReducer,
    typeWorkSlice,
    unitReducer,
    unitSlice,
    usersReducer,
    usersSlice,
};
