import {
    ICreateStorageDto,
    IStorage,
    IStorageAndUsersAndObjects,
} from "src/shared/interfaces";
import { mainManagerApi } from "../main";

type T0<T> = T extends IStorageAndUsersAndObjects
    ? IStorageAndUsersAndObjects
    : { err: string };

export const storageApi = mainManagerApi.injectEndpoints({
    endpoints: (builder) => ({
        createStorage: builder.mutation<any, ICreateStorageDto>({
            query: (data) => ({
                url: "/storage",
                method: "POST",
                body: data,
            }),
        }),

        checkName: builder.query<
            { statusCode: number; message: string },
            { nameStorage: string }
        >({
            query: ({ nameStorage }) => ({
                url: `storage/checkName/?name=${nameStorage}`,
                method: "GET",
            }),
        }),

        getOneById: builder.query<IStorageAndUsersAndObjects, { id: number }>({
            query: ({ id }) => ({
                url: `storage/${id}`,
                method: "GET",
            }),
        }),

        getAll: builder.query<IStorageAndUsersAndObjects[], void>({
            query: () => ({
                url: "/storage",
                method: "GET",
            }),
        }),

        getAllShort: builder.query<IStorage[], void>({
            query: () => ({
                url: "/storage/short",
                method: "GET",
            }),
        }),
    }),
});