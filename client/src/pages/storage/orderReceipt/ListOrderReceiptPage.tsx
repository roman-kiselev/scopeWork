import { ListOrderReceipt } from "src/entities";
import { orderReceiptApi } from "src/shared/api";

const ListOrderReceiptPage = () => {
    const { data: allList, isLoading: isLoadingGetAll } =
        orderReceiptApi.useGetAllOrderReceiptQuery();

    return <ListOrderReceipt allList={allList ?? []} />;
};

export default ListOrderReceiptPage;
