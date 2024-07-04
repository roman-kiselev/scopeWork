import {
    combineReducers,
    configureStore,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import {
    authApi,
    iamApi,
    mainApi,
    mainManagerApi,
    objectMainApi,
} from "../../shared/api";
import {
    authReducer,
    dataOneUserReducer,
    nameWorkListReducer,
    nameWorkReducer,
    objectReducer,
    ordersReducer,
    scopeWorkReducer,
    typeWorkReducer,
    unitReducer,
    usersReducer,
} from "../../shared/models";

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: (action, listenerApi) => {
        console.log(action.payload);
        // const cookie = new Cookies();
        // cookie.remove("refreshToken");
        listenerApi.cancelActiveListeners();
        if (action.payload.accessToken && action.payload.refreshToken) {
            localStorage.setItem("token", action.payload.accessToken);
            const cookie = new Cookies();
            cookie.set("refreshToken", action.payload.refreshToken);
        }
    },
});
// listenerMiddleware.startListening({
//     matcher: authApi.endpoints.refresh.matchFulfilled,
//     effect: (action, listenerApi) => {
//         listenerApi.cancelActiveListeners();
//         if (action.payload.accessToken) {
//             localStorage.setItem("token", action.payload.accessToken);
//         }
//     },
// });

const rootReducer = combineReducers({
    auth: authReducer,
    objects: objectReducer,
    unit: unitReducer,
    typeWork: typeWorkReducer,
    nameWork: nameWorkReducer,
    users: usersReducer,
    nameWorkList: nameWorkListReducer,
    scopeWork: scopeWorkReducer,
    dataOneUser: dataOneUserReducer,
    orders: ordersReducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [objectMainApi.reducerPath]: objectMainApi.reducer,
    [mainManagerApi.reducerPath]: mainManagerApi.reducer,
    [iamApi.reducerPath]: iamApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware()
            .concat(
                mainApi.middleware,
                objectMainApi.middleware,
                mainManagerApi.middleware,
                iamApi.middleware
            )
            .prepend(listenerMiddleware.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export default store;
