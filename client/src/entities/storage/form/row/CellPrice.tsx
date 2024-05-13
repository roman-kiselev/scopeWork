import { Input, Row } from "antd";
import { useAppDispatch } from "src/shared/hooks";
import { editRow } from "src/shared/models";

interface ICellPriceProps {
    price: string;
    keyCell: string;
}

const CellPrice: React.FC<ICellPriceProps> = ({ price, keyCell }) => {
    const dispatch = useAppDispatch();

    const handleShangeInput = (value: string) => {
        dispatch(editRow({ key: keyCell, nameField: "price", value: value }));
    };

    return (
        <Row>
            <Input
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleShangeInput(e.target.value)
                }
            />
        </Row>
    );
};

export default CellPrice;
