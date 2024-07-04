import { Input, Row } from "antd";
import React from "react";
import { useAppDispatch } from "src/shared/hooks";
import { editRow } from "src/shared/models";

interface ICellQuantityProps {
    quantity: number;
    keyCell: string;
    disabled?: boolean;
}

const CellQuantity: React.FC<ICellQuantityProps> = ({
    quantity,
    keyCell,
    disabled = false,
}) => {
    const dispatch = useAppDispatch();
    //const { data } = useAppSelector((store) => store.orders.orderReceipt);

    const handleShangeInput = (value: string) => {
        dispatch(
            editRow({ key: keyCell, nameField: "quantity", value: value })
        );
    };

    return (
        <Row>
            <Input
                disabled={disabled}
                value={quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleShangeInput(e.target.value)
                }
                type="number"
            />
        </Row>
    );
};

export default CellQuantity;
