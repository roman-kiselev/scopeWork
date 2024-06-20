import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Space, Table, TableProps, Tag } from "antd";
import { useWatch } from "antd/es/form/Form";
import { useState } from "react";
import { useParams } from "react-router";
import {
    orderReceiptApi,
    orderReceiptNameApi,
    providerApi,
} from "src/shared/api";
import { useAppSelector } from "src/shared/hooks";
import { IDataOrderReceipt } from "src/shared/interfaces";
import { StatusOrderReceiptName } from "src/shared/interfaces/models/orders";
import { EmptyModal } from "src/shared/ui";
import CellName from "./row/CellName";
import CellProvider from "./row/CellProvider";
import CellQuantity from "./row/CellQuantity";

const FormTableNameCheck = () => {
    const { id } = useParams();
    const idOrder = id ? id : 0;
    const { data: providers, isLoading: isLoadingProviders } =
        providerApi.useGetAllQuery();
    const [stateModal, setStateModal] = useState<boolean>(false);
    const [dataItem, setDataItem] = useState<IDataOrderReceipt | null>(null);
    const [addRow, { data: newData, isLoading: isLoadingReceipt }] =
        orderReceiptApi.useAddChildrenRowMutation();

    const [accept, { isLoading: isLoadingAccept }] =
        orderReceiptNameApi.useAcceptRowMutation();

    const [form] = Form.useForm();
    const dataQuantity: { quantity: string } = useWatch([], form);

    const {
        data,
        total,
        numberOrder,
        isLoading: isLoadingData,
    } = useAppSelector((store) => store.orders.orderReceipt);

    const dataForTable = data.map((item) => {
        return {
            key: item.key,
            index: item.index,
            id: item.id,
            name: item.name,
            provider: item.provider,
            quantity: item.quantity,
            price: item.price,
            status: item.status,
            rowId: item.rowId,
        };
    });

    const handleOpenModal = (record: IDataOrderReceipt) => {
        setDataItem(record);
        setStateModal(true);
    };
    const handleClickModal = () => {
        if (dataItem) {
            addRow({
                id: +idOrder ?? 0,
                dto: { newRowQuantity: +dataQuantity.quantity, ...dataItem },
            });
        }

        console.log(dataItem, dataQuantity);
    };
    const handleCloseModal = () => {
        setStateModal(false);
    };
    // TODO Принять полностью (добавить на склад)
    const acceptRow = (render: IDataOrderReceipt) => {
        accept({ id: render.id, dto: { orderId: +idOrder } });
    };
    // TODO Принять частично (добавить на склад, модальное окно фактическое кол-во)
    // Раздвоить позицию остаток добавить в список

    const columns: TableProps<IDataOrderReceipt>["columns"] = [
        {
            title: "№",
            dataIndex: "key",
            key: "key",
            render: (text) => <p>{text}</p>,
            width: "5%",
        },
        {
            title: "Наименование",
            dataIndex: "name",
            key: "name",
            render: (_, render) => (
                <CellName
                    key={render.key}
                    cellKey={render.key}
                    dataName={render.name}
                    disabled={true}
                />
            ),
        },
        {
            title: "Поставщик",
            dataIndex: "provider",
            key: "provider",
            render: (text, render) => (
                <CellProvider
                    cellKey={render.key}
                    providers={providers}
                    defaultProvider={render.provider}
                    disabled={true}
                />
            ),
            width: "20%",
            align: "center",
        },
        {
            title: "Кол-во",
            dataIndex: "quantity",
            key: "quantity",
            width: "12%",
            render: (text, render) => (
                <CellQuantity
                    disabled={true}
                    quantity={render.quantity}
                    keyCell={render.key}
                />
            ),
        },
        // {
        //     title: "Статус",
        //     dataIndex: "status",
        //     key: "status",
        //     width: "12%",
        //     render: (text, render) => (
        //         <CellQuantity
        //             disabled={true}
        //             quantity={render.quantity}
        //             keyCell={render.key}
        //         />
        //     ),
        // },
        {
            title: "Действие",
            key: "action",
            width: "7%",
            render: (_, record) => (
                <>
                    {record.status === StatusOrderReceiptName.COMPLETED ? (
                        <Tag color="#87d068">Принят</Tag>
                    ) : (
                        <Space>
                            <Button
                                style={{
                                    backgroundColor: "#009900",
                                    color: "white",
                                }}
                                size="small"
                                // onClick={() => dispatch(deleteRow(record.key))}
                                onClick={() => acceptRow(record)}
                            >
                                <CheckOutlined />
                            </Button>
                            {/* <Button
                                style={{
                                    backgroundColor: "#FFFF00",
                                    color: "black",
                                }}
                                size="small"
                                // onClick={() => dispatch(deleteRow(record.key))}
                                onClick={() => handleOpenModal(record)}
                            >
                                <ExclamationOutlined />
                            </Button> */}
                        </Space>
                    )}
                </>
            ),
        },
    ];

    return (
        <>
            <EmptyModal
                handleCancel={handleCloseModal}
                open={stateModal}
                title="Укажите фактическое кол-во"
            >
                <Row>
                    <Form form={form} onFinish={handleClickModal}>
                        <Form.Item
                            name="quantity"
                            label="Кол-во"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">Принять</Button>
                        </Form.Item>
                    </Form>
                </Row>
            </EmptyModal>
            <Table
                scroll={{ y: 500 }}
                style={{ width: "100%" }}
                columns={columns}
                dataSource={dataForTable}
                pagination={false}
                bordered={true}
                size="small"
                tableLayout="auto"
            />
        </>
    );
};

export default FormTableNameCheck;
