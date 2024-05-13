import { Input, Row } from "antd";

interface ICellPriceProps {
    price: string;
}

const CellPrice: React.FC<ICellPriceProps> = ({ price }) => {
    return (
        <Row>
            <Input value={price} />
        </Row>
    );
};

export default CellPrice;
