import { ListOrderReceipt } from "src/entities";
import { orderReceiptApi } from "src/shared/api";

const HomepageWarehouseman = () => {
    const { data } = orderReceiptApi.useGetAllActiveQuery();
    console.log(data);
    return <ListOrderReceipt allList={data ?? []} />;
};

export default HomepageWarehouseman;
