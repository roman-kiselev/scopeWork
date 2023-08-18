import { IDataError } from "../../interfaces";
import { ITypeWork } from "../../interfaces/models";
import { mainApi } from "../main";

export const typeWorkApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTypeWork: builder.mutation<ITypeWork[], void>({
            query: () => ({
                url: "/type-work",
                method: "GET",
            }),
        }),
    }),
});
