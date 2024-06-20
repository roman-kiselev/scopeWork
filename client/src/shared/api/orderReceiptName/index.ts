import { IAcceptRowDto } from "src/shared/interfaces/models";
import { mainManagerApi } from "../main";

export const orderReceiptNameApi = mainManagerApi.injectEndpoints({
    endpoints: (builder) => ({
        acceptRow: builder.mutation<any, { id: number; dto: IAcceptRowDto }>({
            query: (data) => {
                console.log(data);

                return {
                    url: `/order-receipt-name/accept-row/${data.id}`,
                    method: "PATCH",
                    body: data.dto,
                };
            },
        }),
    }),
});
