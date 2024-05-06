import { Row, Table, TableProps, Typography } from "antd";
import { Link } from "react-router-dom";
import { orderReceiptApi } from "src/shared/api";

interface DataType {
    key: string;
    index: number;
    id: string;
    numberList: number;
    nameStorage: string;
    status: boolean;
    amount: number;
}
// Adopted/Not accepted/ Partially accepted/

const ListOrderReceipt = () => {
    // Получем все списки
    // и отображаем здесь в таблице
    const { data: allList, isLoading: isLoadingGetAll } =
        orderReceiptApi.useGetAllOrderReceiptQuery();
    console.log(allList);

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "№",
            dataIndex: "index",
            key: "index",
            render: (_, { index }) => <p>{index}</p>,
        },
        {
            title: "Номер поступления",
            dataIndex: "numberList",
            key: "numberList",
            render: (_, { id }) => <p>{id}</p>,
        },
        {
            title: "Наименование склада",
            dataIndex: "nameStorage",
            key: "nameStorage",
            render: (_, { nameStorage }) => <p>{nameStorage}</p>,
        },
        {
            title: "Сумма",
            dataIndex: "amount",
            key: "amount",
            render: (_, { amount }) => <p>{amount}</p>,
        },
        {
            title: "Действие",
            dataIndex: "action",
            key: "action",
            render: (_, render) => (
                <>
                    <Link to={`${render.id}`}>Перейти</Link>
                </>
            ),
        },
    ];

    const data = [] as DataType[];

    return (
        <Row
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
            <Typography.Title level={3}>Список поступлений</Typography.Title>
            <Table columns={columns} dataSource={data} />
        </Row>
    );
};

export default ListOrderReceipt;
