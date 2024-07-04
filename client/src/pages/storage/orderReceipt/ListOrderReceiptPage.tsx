import { ListOrderReceipt } from "src/entities";
import { orderReceiptApi } from "src/shared/api";

const ListOrderReceiptPage = () => {
    const { data: allList } = orderReceiptApi.useGetAllOrderReceiptQuery();

    return <ListOrderReceipt allList={allList ?? []} />;
};

export default ListOrderReceiptPage;
