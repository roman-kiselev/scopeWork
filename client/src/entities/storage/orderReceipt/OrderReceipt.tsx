import { Button, Col, Divider, Row, Select, Space, Spin } from "antd";
import { orderReceiptApi, storageApi } from "src/shared/api";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";
import {
    ICreateOrderReceiptDto,
    IOrderReceipt,
    IOrderReceiptCreateName,
    IStorage,
} from "src/shared/interfaces";
import { setStorage } from "src/shared/models";
import { getItem } from "src/shared/utils";
import FormTableName from "../form/FormTableName";

const prepareData = (
    data: IOrderReceipt,
    userId: number
): ICreateOrderReceiptDto => {
    // const names = data.data.map((item) => {
    //     return {
    //         id: item.id,
    //         index: item.index,
    //         nameWorkId: item.name.id ? item.name.id : 0,
    //         name: item.name ? item.name.name : "",
    //     } as IOrderReceiptCreateName;
    // });
    const names: IOrderReceiptCreateName[] = [];

    data.data.forEach((item) => {
        if (item.name) {
            names.push({
                id: item.id,
                index: item.index,
                nameWorkId: item.name.id ? item.name.id : 0,
                name: item.name ? item.name.name : "",
                quantity: Number(item.quantity),
                price: Number(item.price),
                orderReceiptId: item.id,
                providerId: item.provider ? item.provider.id : 0,
            } as IOrderReceiptCreateName);
        }
    });

    const finishData: ICreateOrderReceiptDto = {
        id: data.numberOrder,
        storageId: data.storage?.id ?? 0,
        userCreateId: userId,
        orderReceiptNames: JSON.stringify(names),
    };

    return finishData;
};

const OrderReceipt = () => {
    const dispatch = useAppDispatch();
    const { id: userId } = useAppSelector((store) => store.auth);
    const { data: listStorage, isLoading: isLoadingStorage } =
        storageApi.useGetAllShortQuery();
    const [createOrderReceipt, { isLoading: isLoadingCreateOrderReceipt }] =
        orderReceiptApi.useCreateOrderReceiptMutation();

    const { orderReceipt } = useAppSelector((store) => store.orders);
    if (isLoadingStorage) {
        return <Spin />;
    }

    const handleSave = () => {
        if (userId) {
            const dto = prepareData(orderReceipt, userId);
            createOrderReceipt(dto);
        }
    };

    const handleChangeSelect = (value: number) => {
        if (listStorage) {
            const item = getItem<IStorage>(listStorage, value, "id");
            if (item) {
                dispatch(setStorage(item));
            }
        }
    };

    const dataForSelect =
        listStorage && listStorage !== undefined
            ? listStorage.map((item) => {
                  return {
                      value: item.id,
                      label: `${item.name} (${item.address})`,
                  };
              })
            : [];

    return (
        <Row style={{ margin: 10, flexDirection: "column" }}>
            <h3 style={{ margin: 10 }}>Пополнение склада</h3>
            <Row>
                <Space>
                    <Col style={{ width: 300 }}>
                        <Select
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
