import { Input, Row } from "antd";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";

interface ICellQuantityProps {
    quantity: string;
}

const CellQuantity: React.FC<ICellQuantityProps> = ({ quantity }) => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((store) => store.orders.orderReceipt);

    return (
        <Row>
            <Input value={quantity} />
        </Row>
    );
};

export default CellQuantity;
