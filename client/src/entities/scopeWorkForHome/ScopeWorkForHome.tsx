import { Row, Space, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { scopeWorkApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

interface DataType {
    key: string;
    number: string;
    typeWork: string;
    object: string;
    progress: string;
    action: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "№",
        dataIndex: "number",
        key: "number",
        render: (num) => <Link to={`/${num}`}>{num}</Link>,
        responsive: ["sm", "lg", "md", "xl", "xs"],
    },
    {
        title: "Тип работ",
        dataIndex: "typeWork",
        key: "typeWork",
        responsive: ["sm", "lg", "md", "xl", "xs"],
    },
    {
        title: "Объект",
        dataIndex: "object",
        key: "object",
        responsive: ["sm", "lg", "md", "xl", "xs"],
    },
    {
        title: "Прогресс",
        dataIndex: "progress",
        key: "progress",
        responsive: ["lg"],
    },
    {
        title: "Действие",
        key: "action",
        render: (_: any, { number }) => (
            <Space size="middle">
                <Link to={`/${number}`}>Перейти</Link>
            </Space>
        ),
        responsive: ["lg"],
    },
];

// const data: DataType[] = [
//     {
//         key: "1",
//         name: "John Brown",
//         age: 32,
//         address: "New York No. 1 Lake Park",
//         tags: ["nice", "developer"],
//     },
//     {
//         key: "2",
//         name: "Jim Green",
//         age: 42,
//         address: "London No. 1 Lake Park",
//         tags: ["loser"],
//     },
//     {
//         key: "3",
//         name: "Joe Black",
//         age: 32,
//         address: "Sydney No. 1 Lake Park",
//         tags: ["cool", "teacher"],
//     },
// ];

const ScopeWorkForHome = () => {
    const { id, banned } = useAppSelector((store) => store.auth);
    if (id) {
        const { data } = scopeWorkApi.useGetAllScopeWorkByUserIdQuery({
            id: id,
        });
    }
    const { scopeWorkData, isLoading } = useAppSelector(
        (store) => store.dataOneUser
    );

    const dataForTable = scopeWorkData.map((scopeWork) => {
        const { object, typeWork, id } = scopeWork;
        return {
            key: id ?? "",
            number: id ?? "",
            action: id ?? "",
            progress: "?",
            object: object?.name,
            typeWork: typeWork?.name,
        } as DataType;
    });

    if (isLoading) {
        return <Spin />;
    }

    return (
        <>
            <Row style={{ marginBottom: 10 }}>
                <h2>Доступные работы</h2>
            </Row>
            <Table size="small" columns={columns} dataSource={dataForTable} />
        </>
    );
};

export default ScopeWorkForHome;
