import { objectMainApi } from '../main'
import { IObjectCreateAttr, IObjectCreateResponse } from '../../interfaces'


export const objectsApi = objectMainApi.injectEndpoints({

    endpoints: (builder) => ({
        create: builder.mutation<IObjectCreateResponse, IObjectCreateAttr>({
            query: (objectData) => ({
                url: '/',
                method: 'POST',
                body: objectData
            })
        }),
        getAllObjects: builder.query<IObjectCreateResponse[], void>({
            query: () => ({
                url: '/',
                method: 'GET'
            })
        })

    })
})