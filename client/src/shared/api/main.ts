import { createApi } from "@reduxjs/toolkit/query/react";
import { AxiosError } from "axios";
import {
    axiosInstance,
    axiosInstanceIam,
    axiosInstanceManager,
} from "./axiosInstance";

// const prepareHeaders = (headers: Headers, getState: () => unknown) => {
//     const token =
//         (getState() as RootState).auth.token || localStorage.getItem("token");
//     if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//     } else {
//         try {
//             const newToken = (getState() as RootState).auth.token;
//             headers.set("Authorization", `Bearer ${newToken}`);
//         } catch (error) {
//             // TODO Реализовать выход из системы(Переделать компоненты)

//             // axiosInstanceIam.get("/authentication/refresh-tokens");

//             // Обработка ошибки обновления токена, например, редирект на страницу входа
//             window.location.href = "/login";
//         }
//     }
// };

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, body, params, headers }: any) => {
        try {
            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data: body,
                params,
                headers,
            });

            return result;
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

const axiosBaseQueryWithIam =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, body, params, headers }: any) => {
        try {
            const result = await axiosInstanceIam({
                url: baseUrl + url,
                method,
                data: body,
                params,
                headers,
            });

            return result;
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

const axiosBaseQueryManagerWithIam =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, body, params, headers }: any) => {
        try {
            const result = await axiosInstanceManager({
                url: baseUrl + url,
                method,
                data: body,
                params,
                headers,
            });

            return result;
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

// const baseQueryPlusPath = (path: string) => {
//     const baseQuery = fetchBaseQuery({
//         baseUrl: process.env.REACT_APP_URL_API + path,
//         prepareHeaders: (headers, { getState }) => {
//             const token =
//                 (getState() as RootState).auth.token ||
//                 localStorage.getItem("token");
//             if (token) {
//                 headers.set("Authorization", `Bearer ${token}`);
//             }
//         },
//     });

//     return baseQuery;
// };

// const baseQueryWithRetryObject = retry(baseQueryPlusPath("/objects"), {
//     maxRetries: 1,
// });

export const mainApi = createApi({
    reducerPath: "main",
    tagTypes: ["Main"],
    // baseQuery: baseQuery,
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_URL_API || "",
    }),
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});

export const mainManagerApi = createApi({
    reducerPath: "mainManager",
    tagTypes: ["MainManager"],
    // baseQuery: baseManagerQuery,
    baseQuery: axiosBaseQueryManagerWithIam({
        baseUrl: process.env.REACT_APP_URL_API_MANAGER || "",
    }),
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});

// export const objectMainApi = createApi({
//     reducerPath: "objectsMain",
//     tagTypes: ["Objects"],
//     baseQuery: baseQueryWithRetryObject,
//     refetchOnMountOrArgChange: true,
//     endpoints: () => ({}),
// });

export const iamApi = createApi({
    reducerPath: "iam",
    tagTypes: ["Iam"],
    // baseQuery: baseIamQuery,
    baseQuery: axiosBaseQueryWithIam({
        baseUrl: process.env.REACT_APP_URL_API_IAM || "",
    }),
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});

// const baseManagerQuery = fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_URL_API_MANAGER,
//     prepareHeaders: async (headers, { getState }) => {
//         prepareHeaders(headers, getState);
//     },
// });

// const baseIamQuery = fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_URL_API_IAM,
//     prepareHeaders: (headers, { getState }) => {
//         prepareHeaders(headers, getState);
//     },
//     credentials: "include",
// });

// const baseQuery = fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_URL_API,
//     prepareHeaders: (headers, { getState }) => {
//         prepareHeaders(headers, getState);
//     },
// });

// const baseQueryWithReauth: BaseQueryFn<
//     string | FetchArgs,
//     unknown,
//     FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//     // if (isRefreshingToken) {
//     //     return baseQuery(args, api, extraOptions);
//     // }

//     // isRefreshingToken = true;
//     const mainResult = await baseQuery(args, api, extraOptions);
//     // try {
//     //     const { accessToken } = await api
//     //         .dispatch(authApi.endpoints.refresh.initiate())
//     //         .unwrap();
//     //     if (accessToken) {
//     //         localStorage.setItem("token", accessToken);
//     //     }
//     // } catch (error) {
//     //     localStorage.removeItem("token");
//     // }
//     // isRefreshingToken = false;
//     return mainResult;
// };

// const baseQueryManagerWithReauth: BaseQueryFn<
//     string | FetchArgs,
//     unknown,
//     FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//     if (isRefreshingToken) {
//         return baseQuery(args, api, extraOptions);
//     }

//     isRefreshingToken = true;
//     const mainResult = await baseManagerQuery(args, api, extraOptions);
//     try {
//         const { accessToken } = await api
//             .dispatch(authApi.endpoints.refresh.initiate())
//             .unwrap();
//         if (accessToken) {
//             localStorage.setItem("token", accessToken);
//         }
//     } catch (error) {
//         localStorage.removeItem("token");
//     }
//     isRefreshingToken = false;
//     return mainResult;
// };
// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
// const baseQueryManagerWithRetry = retry(baseManagerQuery, { maxRetries: 1 });
// const baseQueryIamWithRetry = retry(baseIamQuery, { maxRetries: 1 });
