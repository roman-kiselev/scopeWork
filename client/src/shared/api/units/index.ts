import { IUnit, IUnitsCreateAttr } from "../../interfaces/models";
import { mainApi } from "../main";

export const unitsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        createUnit: builder.mutation<IUnit, IUnitsCreateAttr>({
            query: (unitData) => ({
                url: "/unit",
                method: "POST",
                body: unitData,
            }),
        }),
        getAllUnits: builder.query<IUnit[], void>({
            query: () => ({
                url: "/unit",
                method: "GET",
            }),
        }),
    }),
});
