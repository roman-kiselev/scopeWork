import {
    IObjectCreateAttr,
    IObjectCreateResponse,
    IOneObjectDataShort,
} from "../../interfaces";
import { objectMainApi } from "../main";

export const objectsApi = objectMainApi.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation<IObjectCreateResponse, IObjectCreateAttr>({
            query: (objectData) => ({
                url: "/",
                method: "POST",
                body: objectData,
            }),
        }),
        getAllObjects: builder.query<IObjectCreateResponse[], void>({
            query: () => ({
                url: "/",
                method: "GET",
            }),
        }),
        getAllShortData: builder.query<IOneObjectDataShort[], void>({
            query: () => ({
                url: "/shortData",
                method: "GET",
            }),
        }),
    }),
});
