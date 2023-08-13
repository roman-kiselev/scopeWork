import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {RootState} from "../../app/store";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL_API,
    prepareHeaders: (headers, {getState}) => {
        const token =
            (getState() as RootState).auth.token ||
            localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
    },
});

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1});

export const mainApi = createApi({
    reducerPath: "main",
    tagTypes: ["Main"],
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});


export const objectMainApi = createApi({
    reducerPath: "objectsMain",
    tagTypes: ["Objects"],
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})