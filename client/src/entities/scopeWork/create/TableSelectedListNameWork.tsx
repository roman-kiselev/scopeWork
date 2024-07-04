import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { delForCreate, resetScopeWorkData } from "../../../shared/models";

interface DataType {
    index: number;
    key: string;
    name: string;
    number: number;
    description: string;
    action: number;
}

// const data: DataType[] = [
//     {
//         index: 1,
//         key: "1",
//         name: "John Brown",
//         number: 1,
//         description: "New York No. 1 Lake Park",
//         // tags: ["nice", "developer"],
//     },
//     {
//         index: 2,
//         key: "2",
//         name: "Jim Green",
//         number: 2,
//         description: "London No. 1 Lake Park",
//         // tags: ["loser"],
//     },
//     {
//         index: 3,
//         key: "3",
//         name: "Joe Black",
//         number: 3,
//         description: "Sydney No. 1 Lake Park",
//         // tags: ["cool", "teacher"],
//     },
// ];

const TableSelectedListNameWork = () => {
    const dispatch = useAppDispatch();
    const handleDel = (id: number) => {
        dispatch(delForCreate(id));
    };
    const columns: ColumnsType<DataType> = [
        {
            title: "№",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Номер",
            dataIndex: "number",
            key: "number",
            render: (num) => (
                <Link
                    to={`http://localhost:3000/admin/object/list/listItem/${num}`}
                >
                    {num}
                </Link>
            ),
        },
        {
            title: "Наименование",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Описание",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Действие",
            dataIndex: "action",
            key: "action",
            render: (num) => (
                <Button danger onClick={() => handleDel(num)}>
                    Удалить
                </Button>
            ),
        },
    ];

    useEffect(() => {
        dispatch(resetScopeWorkData());
    }, []);
    // Получим списки
    const { listNameWork } = useAppSelector(
        (store) => store.scopeWork.scopeWorkData
    );
    const data = listNameWork?.map((item, index) => {
        const { id, name, description } = item;

        return {
            key: id.toString(),
            index: index + 1,
            number: id,
            name: name ?? "",
            description: description ?? "",
            action: id,
        } as DataType;
    });

    return <Table columns={columns} dataSource={data} />;
};

export default TableSelectedListNameWork;
