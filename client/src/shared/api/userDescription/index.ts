import { IUserDescription } from "src/shared/interfaces";
import { mainApi } from "../main";

export const userDescriptionApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAll: builder.query<IUserDescription[], void>({
            query: () => ({
                url: `/user-description`,
                method: "GET",
            }),
        }),
    }),
});
