import { CheckOutlined, ExclamationOutlined } from "@ant-design/icons";
import { Button, Space, Table, TableProps } from "antd";
import { providerApi } from "src/shared/api";
import { useAppSelector } from "src/shared/hooks";
import { IDataOrderReceipt } from "src/shared/interfaces";
import CellName from "./row/CellName";
import CellProvider from "./row/CellProvider";
import CellQuantity from "./row/CellQuantity";

const FormTableNameCheck = () => {
    const { data: providers, isLoading: isLoadingProviders } =
        providerApi.useGetAllQuery();

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
        };
    });

    // TODO Принять полностью (добавить на склад)

    // TODO Принять частично (добавить на склад, модальное окно фактическое кол-во)
    // Раздвоить позицию остаток добавить в список

    //

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
            title: "Action",
            key: "action",
            width: "7%",
            render: (_, record) => (
                <Space>
                    <Button
                        style={{ backgroundColor: "#009900", color: "white" }}
                        size="small"
                        // onClick={() => dispatch(deleteRow(record.key))}
                        onClick={() => {}}
                    >
                        <CheckOutlined />
                    </Button>
                    <Button
                        style={{ backgroundColor: "#FFFF00", color: "black" }}
                        size="small"
                        // onClick={() => dispatch(deleteRow(record.key))}
                        onClick={() => {}}
                    >
                        <ExclamationOutlined />
                    </Button>
                    {/* <Button
                        style={{ backgroundColor: "#FF3300", color: "white" }}
                        size="small"
                        // onClick={() => dispatch(deleteRow(record.key))}
                        onClick={() => {}}
                    >
                        <CloseOutlined />
                    </Button> */}
                </Space>
            ),
        },
    ];

    return (
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
    );
};

export default FormTableNameCheck;
