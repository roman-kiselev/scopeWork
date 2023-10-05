import { Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { delForEdit } from "../../../shared/models";

interface DataType {
    index: number;
    key: string;
    name: string;
    number: number;
    description: string;
    action: number;
}

const TableSelected = () => {
    const dispatch = useAppDispatch();
    const handleDel = (id: number) => {
        dispatch(delForEdit(id));
    };
    const { isLoading } = useAppSelector((store) => store.scopeWork);
    const { listNameWork } = useAppSelector(
        (store) => store.scopeWork.selectedScopeWorkById
    );

    if (isLoading) {
        return <Spin />;
    }

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
        // {
        //     title: "",
        //     dataIndex: "action",
        //     key: "action",
        //     render: (num) => (
        //         <Button danger onClick={() => handleDel(num)}>
        //             Удалить
        //         </Button>
        //     ),
        // },
    ];

    const data = listNameWork?.map((item, index) => {
        const { id, name, description, nameWorks } = item;

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

export default TableSelected;
