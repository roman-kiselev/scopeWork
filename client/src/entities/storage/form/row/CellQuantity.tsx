import { Input, Row } from "antd";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";

interface ICellQuantityProps {}

const CellQuantity = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((store) => store.orders.orderReceipt);

    return (
        <Row>
            <Input />
        </Row>
    );
};

export default CellQuantity;
