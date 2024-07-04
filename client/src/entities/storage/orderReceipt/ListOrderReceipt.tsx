import { Row, Table, TableProps, Typography } from "antd";
import { Link } from "react-router-dom";
import { IOrderReceiptResult } from "src/shared/interfaces";

interface DataType {
    key: string;
    index: number;
    id: string;
    numberList: number;
    nameStorage: string;
    status: boolean;
    amount: number;
}

interface IListOrderReceiptProps {
    allList: IOrderReceiptResult[];
}

const ListOrderReceipt: React.FC<IListOrderReceiptProps> = ({ allList }) => {
    //const roles = useAppSelector((store) => store.auth.roles);

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

        // {
        //     title: "Сумма",
        //     dataIndex: "amount",
        //     key: "amount",
        //     render: (_, { amount }) => <p>{amount}</p>,
        // },

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

    if (allList) {
        allList.forEach((item, index) => {
            data.push({
                key: item.id.toString(),
                index: index + 1,
                id: item.id.toString(),
                numberList: item.id,
                nameStorage: item.storage.name,
                status: item.state,
                amount: 0,
            });
        });
    }
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
