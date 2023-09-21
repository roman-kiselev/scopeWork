import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { listNameWorkApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";

interface DataType {
    key: string;
    id: number;
    index: number;
    number: string;
    date: string;
    description: string;
}

const dataSource: DataType[] = [
    {
        key: "1",
        id: 1,
        index: 1,
        number: "334",
        date: "10/10/2020",
        description: "Описание",
    },
    {
        key: "2",
        id: 2,
        index: 2,
        number: "335",
        date: "10/10/2020",
        description: "Описание",
    },
];

const columns: ColumnsType<DataType> = [
    {
        title: "№",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "№ Списка",
        dataIndex: "number",
        key: "number",
    },
    {
        title: "Дата создания",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Наименование и Описание",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Действия",
        dataIndex: "action",
        key: "action",
        render: (_: any, { id }) => <Link to={`${id}`}>Перейти</Link>,
    },
];

// Получаем дату
const getDate = (d: string) => {
    const arrD = d.split("T");
    return arrD[0];
};

const ListNameWorkTable = () => {
    const { data: dataQuery } = listNameWorkApi.useGetAllNamesQuery();
    const { isLoading, listItem } = useAppSelector(
        (store) => store.nameWorkList
    );

    const dataForTable = listItem?.map((item, index) => {
        const { id, createdAt, description, name } = item;
        return {
            id: id,
            date: getDate(createdAt),
            index: index + 1,
            key: id?.toString(),
            description: `${name} ${description}`,
            number: id?.toString(),
        };
    });

    if (isLoading) {
        return <h3>Loading...</h3>;
    }
    return <Table dataSource={dataForTable} columns={columns} />;
};

export default ListNameWorkTable;
