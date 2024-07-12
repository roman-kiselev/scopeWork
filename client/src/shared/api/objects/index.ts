import {
    IObjectCreateAttr,
    IObjectCreateResponse,
    IObjectFullData,
    IObjectShort,
    IOneObjectDataShort,
} from "../../interfaces";
import { mainApi } from "../main";

export const objectsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation<IObjectCreateResponse, IObjectCreateAttr>({
            query: (objectData) => ({
                url: "objects",
                method: "POST",
                body: objectData,
            }),
        }),
        getAllObjects: builder.query<IObjectCreateResponse[], void>({
            query: () => ({
                url: "objects",
                method: "GET",
            }),
        }),
        getAllShortData: builder.query<IOneObjectDataShort[], void>({
            query: () => ({
                url: "objects/shortData",
                method: "GET",
            }),
        }),

        getFullDataForOne: builder.query<IObjectFullData, number>({
            query: (id) => ({
                url: `objects/fullData/${id}`,
                method: "GET",
            }),
        }),
        getAllObjectShort: builder.query<IObjectShort[], void>({
            query: () => ({
                url: `objects/shortAllObjects`,
                method: "GET",
            }),
        }),
    }),
});
