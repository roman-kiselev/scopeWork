import { Input, Row } from "antd";
import { useAppDispatch } from "src/shared/hooks";
import { editRow } from "src/shared/models";

interface ICellPriceProps {
    price: number;
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
                type="number"
                step="0.01"
                min="0"
                lang="en-US"
            />
        </Row>
    );
};

export default CellPrice;
