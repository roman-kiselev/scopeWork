import {
    ICreateStorageDto,
    IStorage,
    IStorageAndUsersAndObjects,
} from "src/shared/interfaces";
import { mainManagerApi } from "../main";

export const storageApi = mainManagerApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStorage: builder.query<IStorageAndUsersAndObjects[], void>({
            query: () => ({
                url: "/storage",
                method: "GET",
            }),
        }),
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

        getAllShort: builder.query<IStorage[], void>({
            query: () => ({
                url: "/storage/short",
                method: "GET",
            }),
        }),
    }),
});
