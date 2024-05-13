import { Button, Col, Divider, Row, Select, Space } from "antd";
import React from "react";
import { useAppSelector } from "src/shared/hooks";
import FormTableName from "../form/FormTableName";

// const prepareData = (
//     data: IOrderReceipt,
//     userId: number
// ): ICreateOrderReceiptDto => {
//     // const names = data.data.map((item) => {
//     //     return {
//     //         id: item.id,
//     //         index: item.index,
//     //         nameWorkId: item.name.id ? item.name.id : 0,
//     //         name: item.name ? item.name.name : "",
//     //     } as IOrderReceiptCreateName;
//     // });
//     const names: IOrderReceiptCreateName[] = [];

//     data.data.forEach((item) => {
//         if (item.name) {
//             names.push({
//                 id: item.id,
//                 index: item.index,
//                 nameWorkId: item.name.id ? item.name.id : 0,
//                 name: item.name ? item.name.name : "",
//                 quantity: Number(item.quantity),
//                 price: Number(item.price),
//                 orderReceiptId: item.id,
//                 providerId: item.provider ? item.provider.id : 0,
//             } as IOrderReceiptCreateName);
//         }
//     });

//     const finishData: ICreateOrderReceiptDto = {
//         id: data.numberOrder,
//         storageId: data.storage?.id ?? 0,
//         userCreateId: userId,
//         orderReceiptNames: JSON.stringify(names),
//     };

//     return finishData;
// };

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
    const { numberOrder } = useAppSelector(
        (store) => store.orders.orderReceipt
    );
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
                        <Button
                            type="primary"
                            style={{ backgroundColor: "#2bb673" }}
                        >
                            В работу
                        </Button>
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
