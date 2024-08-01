import {
    combineReducers,
    configureStore,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { iamApi, mainApi, mainManagerApi } from "../../shared/api";
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
import { authApi } from "./../../shared/api/auth/index";

const listenerMiddleware = createListenerMiddleware();
const listenerMiddlewareTwo = createListenerMiddleware();
listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: (action, listenerApi) => {
        listenerApi.cancelActiveListeners();
        if (
            action.payload.data.accessToken &&
            action.payload.data.refreshToken
        ) {
            localStorage.setItem("token", action.payload.data.accessToken);
            const cookie = new Cookies();
            cookie.set("refreshToken", action.payload.data.refreshToken);
            // Перенаправление на главную страницу
            // window.location.href = "/";
        }
    },
});

listenerMiddlewareTwo.startListening({
    matcher: authApi.endpoints.loginWithoutPassword.matchFulfilled,
    effect: (action, listenerApi) => {
        listenerApi.cancelActiveListeners();
        if (
            action.payload.data.accessToken &&
            action.payload.data.refreshToken
        ) {
            localStorage.setItem("token", action.payload.data.accessToken);
            const cookie = new Cookies();
            cookie.set("refreshToken", action.payload.data.refreshToken);
            // Перенаправление на главную страницу
            // window.location.href = "/";
        }
    },
});

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
    [mainManagerApi.reducerPath]: mainManagerApi.reducer,
    [iamApi.reducerPath]: iamApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware()
            .concat(
                mainApi.middleware,
                mainManagerApi.middleware,
                iamApi.middleware
            )
            .prepend(
                listenerMiddleware.middleware,
                listenerMiddlewareTwo.middleware
            );
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export default store;
