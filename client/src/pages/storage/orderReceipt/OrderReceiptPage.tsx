import { useParams } from "react-router";
import { CreateOrderReceipt, UpdateOrderReceipt } from "src/entities";

const OrderReceiptPage = () => {
    const { id } = useParams();

    return (
        <>
            {id !== undefined ? (
                <UpdateOrderReceipt id={id} />
            ) : (
                <CreateOrderReceipt />
            )}
        </>
    );
};

export default OrderReceiptPage;
