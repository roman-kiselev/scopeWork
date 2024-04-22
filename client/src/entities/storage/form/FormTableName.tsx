import { DeleteRowOutlined } from "@ant-design/icons";
import { Button, Divider, Row, Space, Spin, Table, TableProps } from "antd";
import { useState } from "react";
import { providerApi } from "src/shared/api";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";
import { IDataOrderReceipt } from "src/shared/interfaces/models";
import { addNewRow, deleteRow } from "src/shared/models";
import { EmptyModal } from "src/shared/ui";
import CellName from "./row/CellName";
import CellPrice from "./row/CellPrice";
import CellProvider from "./row/CellProvider";
import CellQuantity from "./row/CellQuantity";

const FormTableName = () => {
    const dispatch = useAppDispatch();
    const {
        data,
        name,
        total,
        numberOrder,
        isLoading: isLoadingData,
    } = useAppSelector((store) => store.orders.orderReceipt);
    const [stateModal, setStateModal] = useState<boolean>(false);
    const { isLoading: isLoadingOrders } = useAppSelector(
        (store) => store.orders
    );

    const { data: providers, isLoading: isLoadingProviders } =
        providerApi.useGetAllQuery();

    if (isLoadingData || isLoadingOrders || isLoadingProviders) {
        return <Spin />;
    }

    const dataForTable = data.map((item) => {
        return {
            key: item.key,
            index: item.index,
            id: item.id,
            name: item.name,
            provider: item.provider,
            quantity: item.quantity,
            price: item.price,
        };
    });

    const columns: TableProps<IDataOrderReceipt>["columns"] = [
        {
            title: "№",
            dataIndex: "index",
            key: "index",
            render: (text) => <a>{text}</a>,
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
                    handleViewModal={() => setStateModal(true)}
                />
            ),
        },
        {
            title: "Поставщик",
            dataIndex: "provider",
            key: "provider",
            render: (text, render) => (
                <CellProvider cellKey={render.key} providers={providers} />
            ),
            width: "20%",
            align: "center",
        },
        {
            title: "Кол-во",
            dataIndex: "quantity",
            key: "quantity",
            width: "12%",
            render: (text) => <CellQuantity />,
        },
        {
            title: "Цена",
            dataIndex: "price",
            key: "price",
            width: "12%",
            render: (text) => <CellPrice />,
        },
        // {
        //     title: "Tags",
        //     key: "tags",
        //     dataIndex: "tags",
        //     render: (_, { tags }) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? "geekblue" : "green";
        //                 if (tag === "loser") {
        //                     color = "volcano";
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: "Action",
            key: "action",
            width: "7%",
            render: (_, record) => (
                <Space>
                    <Button
                        style={{ backgroundColor: "#FF3333", color: "white" }}
                        size="small"
                        onClick={() => dispatch(deleteRow(record.key))}
                    >
                        <DeleteRowOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Row style={{ width: "100%" }}>
            <Row>
                <EmptyModal
                    handleCancel={() => setStateModal(false)}
                    open={stateModal}
                    title="Поиск"
                >
                    fdf
                </EmptyModal>
            </Row>
            <Button
                onClick={() => dispatch(addNewRow())}
                type="primary"
                style={{ marginBottom: 16 }}
            >
                Добавить наименование
            </Button>
            <Divider />

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
        </Row>
    );
};

export default FormTableName;
