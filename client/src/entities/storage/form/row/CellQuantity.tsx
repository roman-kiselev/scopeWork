import { Input, Row } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";
import { editRow } from "src/shared/models";

interface ICellQuantityProps {
    quantity: number;
    keyCell: string;
}

const CellQuantity: React.FC<ICellQuantityProps> = ({ quantity, keyCell }) => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((store) => store.orders.orderReceipt);

    const handleShangeInput = (value: string) => {
        dispatch(
            editRow({ key: keyCell, nameField: "quantity", value: value })
        );
    };

    return (
        <Row>
            <Input
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
