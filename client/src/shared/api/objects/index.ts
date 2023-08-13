import {mainApi} from "../main";
import {IObjectCreateAttr, IObjectCreateResponse} from "../../interfaces";


export const objectsApi = mainApi.injectEndpoints({

    endpoints: (builder) => ({
        create: builder.mutation<IObjectCreateResponse, IObjectCreateAttr>({
            query: (objectData) => ({
                url: "/objects/",
                method: "POST",
                body: objectData
            })
        }),
        getAllObjects: builder.query<IObjectCreateResponse[], void>({
            query: () => ({
                url: "/objects/",
                method: "GET",
            })
        })

    })
})