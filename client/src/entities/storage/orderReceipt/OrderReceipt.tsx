import { Button, Col, Divider, Row, Select, Space } from "antd";
import React from "react";
import { useParams } from "react-router";
import { orderReceiptApi } from "src/shared/api";
import { useAppSelector } from "src/shared/hooks";
import FormTableName from "../form/FormTableName";

interface IOrderReceiptProps {
    handleChangeSelect: (value: number) => void;
    dataForSelect: any[];
    handleSave: () => void;
    defaultValue?: number;
}

const OrderReceipt: React.FC<IOrderReceiptProps> = ({
    dataForSelect,
    handleChangeSelect,
    handleSave,
    defaultValue = 0,
}) => {
    const { id: orderId } = useParams();
    const { id: userId, roles } = useAppSelector((store) => store.auth);
    const { stateOrder } = useAppSelector((store) => store.orders.orderReceipt);
    const { numberOrder } = useAppSelector(
        (store) => store.orders.orderReceipt
    );
    const [changeStatus] = orderReceiptApi.useUpdateStateWorkMutation();

    const handleClickForChangeStatus = (
        orderId: number,
        userId: number,
        roles: string[]
    ) => {
        changeStatus({
            id: +orderId,
            dto: {
                state: !stateOrder,
                userId: userId ?? 0,
                userRoles: roles,
            },
        });
    };

    dataForSelect = [{ value: 0, label: "Выбор склада" }, ...dataForSelect];

    return (
        <Row style={{ margin: 10, flexDirection: "column" }}>
            <h3 style={{ margin: 10 }}>
                {numberOrder === 0
                    ? "Создание заказа"
                    : `Заказ №${numberOrder}`}
            </h3>
            <Row>
                <Space>
                    <Col style={{ width: 300 }}>
                        <Select
                            defaultValue={defaultValue}
                            style={{ width: "100%" }}
                            onChange={handleChangeSelect}
                            options={dataForSelect}
                        />
                    </Col>
                    <Col>
                        <Button onClick={handleSave} type="primary">
                            Сохранить
                        </Button>
                    </Col>
                    <Col>
                        {numberOrder !== 0 &&
                        orderId &&
                        userId &&
                        roles.length > 0 ? (
                            <Button
                                type="primary"
                                style={{ backgroundColor: "#2bb673" }}
                                onClick={() =>
                                    handleClickForChangeStatus(
                                        +orderId,
                                        userId,
                                        roles
                                    )
                                }
                            >
                                {stateOrder ? "Отменить" : "В работу"}
                            </Button>
                        ) : (
                            <></>
                        )}
                    </Col>
                </Space>
            </Row>
            <Divider />
            <Row>
                <FormTableName />
            </Row>
        </Row>
    );
};

export default OrderReceipt;
